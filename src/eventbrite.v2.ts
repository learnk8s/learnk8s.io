import cheerio from 'cheerio'
import { zonedTimeToUtc } from 'date-fns-tz'
import { getVenues, State, getWorkshops } from './store'
import { AxiosInstance } from 'axios'
import { read } from './files'
import { renderToJsx } from './markdown'
import { jsxToString } from './jsx-utils/jsxToHast'

export async function SyncVenues({ state, sdk }: { state: State; sdk: AxiosInstance }): Promise<VenueEventBrite[]> {
  const venues = getVenues(state)
  const response = await sdk.get<ResponseVenues>(`/organizations/${state.config.organisationId}/venues/`)
  const { added } = diff({
    previous: response.data.venues.map(it => it.name),
    current: venues.map(it => it.locationName),
  })
  if (added.length === 0) {
    return response.data.venues
  }
  await Promise.all(
    added.map(venueName => {
      const venue = venues.find(it => it.locationName === venueName)!
      return addVenue(venue, sdk, state.config.organisationId)
    }),
  )
  return SyncVenues({ state, sdk })
}

export async function SyncEvents({
  state,
  sdk,
  canPublish,
  log,
}: {
  state: State
  sdk: AxiosInstance
  canPublish: boolean
  log: (...args: any[]) => void
}) {
  try {
    const venues = await SyncVenues({ state, sdk })
    const events = await getEventsFromEventBrite(state.config.organisationId, sdk)
    const workshops = getWorkshops(state)
    const { added, unchanged } = diff({ previous: events.map(it => it.code), current: workshops.map(it => it.id) })

    await Promise.all(
      added.map(async courseId => {
        log(`Creating EventBrite event for ${courseId}`)
        const course = workshops.find(it => it.id === courseId)!
        const courseDescription = jsxToString(renderToJsx(await read(course.description)))
        const event = await upsertEvent(
          {
            duration: course.duration,
            city: course.venue.city,
            code: course.id,
            description: courseDescription,
            timezone: course.timezone,
            currency: course.price.currency,
            locationName: course.venue.locationName,
            startAt: course.startsAt,
            endsAt: course.endsAt,
          },
          venues,
          `/organizations/${state.config.organisationId}/events/`,
          sdk,
        )
        log(`Adding a ticket to ${courseId} (${event.id})`)
        await upsertTicket(
          {
            endpoint: `/events/${event.id}/ticket_classes/`,
            currencyCode: course.price.currency,
            price: course.price.price,
          },
          sdk,
        )
        canPublish ? await publishEvent({ eventId: event.id }, sdk) : null
      }),
    )

    await Promise.all(
      unchanged.map(async courseId => {
        log(`Checking if ${courseId} requires updates`)
        const referenceEvent = events.find(event => event.code === courseId)
        if (!referenceEvent) {
          log(`Event ${courseId} could not be found in the official list of events.`)
          return
        }
        const course = workshops.find(it => it.id === courseId)!
        const courseDescription = jsxToString(renderToJsx(await read(course.description)))
        if (
          !isSameDescription({ code: course.id, description: courseDescription }, referenceEvent.details) ||
          !isSameDate(course, referenceEvent.details) ||
          !isSameVenue(course.venue, referenceEvent.details, venues)
        ) {
          log(`Updating description and starting date for ${courseId}`)
          await upsertEvent(
            {
              duration: course.duration,
              city: course.venue.city,
              code: course.id,
              description: courseDescription,
              timezone: course.timezone,
              currency: course.price.currency,
              locationName: course.venue.locationName,
              startAt: course.startsAt,
              endsAt: course.endsAt,
            },
            venues,
            `/events/${referenceEvent.id}/`,
            sdk,
          )
        }
        if (!isSamePrice(course.price, referenceEvent.details)) {
          log(`Updating ticket price to ${courseId}`)
          await upsertTicket(
            {
              endpoint: `/events/${referenceEvent.id}/ticket_classes/${referenceEvent.details.ticket_classes[0].id}/`,
              currencyCode: course.price.currency,
              price: course.price.price,
            },
            sdk,
          )
        }
      }),
    )
  } catch (error) {
    console.log('ERROR:', error)
  }
}

async function getEventsFromEventBrite(organisationId: string, sdk: AxiosInstance) {
  const res = await sdk.get<ResponseEvents>(
    `/organizations/${organisationId}/events?expand=ticket_classes,venue&status=live&page_size=50`,
  )
  const events = res.data.events.map(it => {
    const $ = cheerio.load(it.description.html || '', { decodeEntities: false })
    return {
      id: it.id,
      code: $('#code').text() || '',
      details: it,
    }
  })
  return events
}

function isSameDescription(a: { code: string; description: string }, b: { description: { html: string | null } }) {
  return (
    cheerio
      .load(renderDescription(a), { decodeEntities: false })('body')
      .text() ===
    cheerio
      .load(b.description.html || '', { decodeEntities: false })('body')
      .text()
  )
}

function isSameDate(a: { startsAt: string; timezone: string }, b: EventEventBrite) {
  return zonedTimeToUtc(a.startsAt, a.timezone).valueOf() === new Date(b.start.utc).valueOf()
}

function isSamePrice(a: { price: number }, b: EventEventBrite) {
  if (b.ticket_classes.length === 0) return false
  return a.price * 100 === b.ticket_classes[0].cost.value
}

function isSameVenue(a: { locationName: string }, b: EventEventBrite, venues: VenueEventBrite[]) {
  const venue = venues.find(it => it.name === a.locationName)
  if (!venue) {
    return false
  }
  return venue.id === b.venue_id
}

function upsertEvent(
  event: {
    duration: string
    city?: string
    code: string
    description: string
    timezone: string
    currency: string
    locationName?: string
    startAt: string
    endsAt: string
  },
  venues: VenueEventBrite[],
  endpoint: string,
  sdk: AxiosInstance,
) {
  const body: any = {
    event: {
      name: {
        html: `Advanced Kubernetes course — ${event.city}`,
      },
      description: {
        html: renderDescription(event),
      },
      start: {
        timezone: event.timezone,
        utc: zonedTimeToUtc(event.startAt, event.timezone)
          .toISOString()
          .replace('.000Z', 'Z'),
      },
      end: {
        timezone: event.timezone,
        utc: zonedTimeToUtc(event.endsAt, event.timezone)
          .toISOString()
          .replace('.000Z', 'Z'),
      },
      currency: event.currency,
      online_event: true,
      listed: true,
      shareable: true,
      show_remaining: false,
      logo_id: '48505063',
      category_id: 102, // Science and Technology
      subcategory_id: 2004, // High Tech
      format_id: 9, // Class, Training, or Workshop (1 for Conference)
    },
  }
  const venue = venues.find(it => it.name === event.locationName)
  if (!!venue) {
    body.event.venue_id = venue.id
    body.event.online_event = false
  }
  return sdk.post<any>(endpoint, body).then(res => {
    return { id: res.data.id as string }
  })
}

function addVenue(
  venue: {
    locationName: string
    address?: string
    postcode?: string
    city?: string
    country?: string
    countryCode: string
  },
  sdk: AxiosInstance,
  organisationId: string,
) {
  const address = {} as any
  if (venue.country) address.country = venue.countryCode
  if (venue.city) address.city = venue.city
  if (venue.postcode) address.postal_code = venue.postcode
  if (venue.address) address.address_1 = venue.address
  return sdk
    .post(`/organizations/${organisationId}/venues/`, {
      venue: {
        name: venue.locationName,
        address,
      },
    })
    .then(it => console.log(it))
    .catch(err => console.log(err))
}

function upsertTicket(
  { endpoint, currencyCode, price }: { endpoint: string; currencyCode: string; price: number },
  sdk: AxiosInstance,
) {
  return sdk
    .post(endpoint, {
      ticket_class: {
        name: 'Standard',
        description: `General admission`,
        quantity_total: 10,
        cost: `${currencyCode},${price}00`,
        include_fee: true,
        hide_description: false,
        sales_channels: ['online'],
      },
    })
    .catch(err => console.log(err))
}

function publishEvent({ eventId }: { eventId: string }, sdk: AxiosInstance) {
  return sdk.post(`/events/${eventId}/publish/`).catch(err => console.log(err))
}

export function diff({
  previous,
  current,
}: {
  previous: string[]
  current: string[]
}): { removed: string[]; unchanged: string[]; added: string[] }
export function diff({
  previous,
  current,
}: {
  previous: number[]
  current: number[]
}): { removed: number[]; unchanged: number[]; added: number[] }
export function diff({
  previous,
  current,
}: {
  previous: Array<string | number>
  current: Array<string | number>
}): { removed: Array<string | number>; unchanged: Array<string | number>; added: Array<string | number> } {
  return {
    removed: previous.filter(a => !current.find(b => a === b)),
    unchanged: previous.filter(a => !!current.find(b => a === b)),
    added: current.filter(b => !previous.find(a => a === b)),
  }
}

function renderDescription({ code, description }: { code: string; description: string }) {
  return `${description}<p>Course code: <span id="code">${code}</span></p>`
}

interface ResponseEvents {
  events: EventEventBrite[]
}

interface ResponseVenues {
  venues: VenueEventBrite[]
}

interface EventEventBrite {
  name: {
    text: string
  }
  description: {
    html: string | null
  }
  id: string
  start: {
    timezone: string
    utc: string
  }
  end: {
    timezone: string
    utc: string
  }
  currency: string
  online_event: boolean
  listed: boolean
  shareable: boolean
  ticket_classes: {
    id: string
    cost: {
      value: number
    }
  }[]
  venue_id: string
}

interface VenueEventBrite {
  name: string
  id: string
}
