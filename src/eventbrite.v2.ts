import cheerio from 'cheerio'
import { Sdk } from 'eventbrite/lib/types'
import { State, getVenues, getWorkshops } from './store'
import { zonedTimeToUtc } from 'date-fns-tz'

export async function SyncVenues({ state, sdk }: { state: State; sdk: Sdk }): Promise<VenueEventBrite[]> {
  const venues = getVenues(state)
  const response = (await sdk.request(`/organizations/${state.organisationId}/venues/`)) as ResponseVenues
  const { added } = diff({ previous: response.venues.map(it => it.name), current: venues.map(it => it.locationName) })
  if (added.length === 0) {
    return response.venues
  }
  await Promise.all(
    added.map(venueName => {
      const venue = venues.find(it => it.locationName === venueName)!
      return addVenue(venue, sdk, state.organisationId)
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
  sdk: Sdk
  canPublish: boolean
  log: (...args: any[]) => void
}) {
  try {
    const venues = await SyncVenues({ state, sdk })
    const events = await getEventsFromEventBrite(state.organisationId, sdk)
    const workshops = getWorkshops(state)
    const { added, unchanged } = diff({ previous: events.map(it => it.code), current: workshops.map(it => it.id) })

    await Promise.all(
      added.map(async courseId => {
        log(`Creating EventBrite event for ${courseId}`)
        const course = workshops.find(it => it.id === courseId)!
        const event = await upsertEvent(
          {
            duration: course.duration,
            city: course.city,
            code: course.id,
            description: course.description,
            timezone: course.timezone,
            currency: course.currency,
            locationName: course.locationName,
            startAt: course.startAt,
            endsAt: course.endsAt,
          },
          venues,
          `/organizations/${state.organisationId}/events/`,
          sdk,
        )
        log(`Adding a ticket to ${courseId}`)
        await upsertTicket(
          {
            endpoint: `/events/${event.id}/ticket_classes/`,
            currencyCode: course.currency,
            price: course.price,
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
        if (
          !isSameDescription({ code: course.id, description: course.description }, referenceEvent.details) ||
          !isSameDate(course, referenceEvent.details) ||
          !isSameVenue(course, referenceEvent.details, venues)
        ) {
          log(`Updating description and starting date for ${courseId}`)
          await upsertEvent(
            {
              duration: course.duration,
              city: course.city,
              code: course.id,
              description: course.description,
              timezone: course.timezone,
              currency: course.currency,
              locationName: course.locationName,
              startAt: course.startAt,
              endsAt: course.endsAt,
            },
            venues,
            `/events/${referenceEvent.id}/`,
            sdk,
          )
        }
        if (!isSamePrice(course, referenceEvent.details)) {
          log(`Updating ticket price to ${courseId}`)
          await upsertTicket(
            {
              endpoint: `/events/${referenceEvent.id}/ticket_classes/${referenceEvent.details.ticket_classes[0].id}/`,
              currencyCode: course.currency,
              price: course.price,
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

async function getEventsFromEventBrite(organisationId: string, sdk: Sdk) {
  const res = await sdk.request(`/organizations/${organisationId}/events?expand=ticket_classes,venue`)
  const response = res as ResponseEvents
  const events = response.events.map(it => {
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
  console.log('desc', a, b)
  return (
    cheerio
      .load(renderDescription(a), { decodeEntities: false })('body')
      .text() ===
    cheerio
      .load(b.description.html || '', { decodeEntities: false })('body')
      .text()
  )
}

function isSameDate(a: { startAt: string }, b: EventEventBrite) {
  return new Date(a.startAt).valueOf() === new Date(b.start.utc).valueOf()
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
  sdk: Sdk,
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
        utc: zonedTimeToUtc(event.startAt, event.timezone).toISOString().replace('.000Z', 'Z'),
      },
      end: {
        timezone: event.timezone,
        utc: zonedTimeToUtc(event.endsAt, event.timezone).toISOString().replace('.000Z', 'Z'),
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
  return sdk
    .request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then(res => {
      return { id: (res as any).id as string }
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
  sdk: Sdk,
  organisationId: string,
) {
  const address = {} as any
  if (venue.country) address.country = venue.countryCode
  if (venue.city) address.city = venue.city
  if (venue.postcode) address.postal_code = venue.postcode
  if (venue.address) address.address_1 = venue.address
  console.log(address)
  return sdk
    .request(`/organizations/${organisationId}/venues/`, {
      method: 'POST',
      body: JSON.stringify({
        venue: {
          name: venue.locationName,
          address,
        },
      }),
    })
    .then(it => console.log(it))
    .catch(err => console.log(err))
}

function upsertTicket(
  { endpoint, currencyCode, price }: { endpoint: string; currencyCode: string; price: number },
  sdk: Sdk,
) {
  return sdk
    .request(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        ticket_class: {
          name: 'Standard',
          description: `General admission`,
          quantity_total: 10,
          cost: `${currencyCode},${price}00`,
          include_fee: true,
          hide_description: false,
          sales_channels: ['online'],
        },
      }),
    })
    .catch(err => console.log(err))
}

function publishEvent({ eventId }: { eventId: string }, sdk: Sdk) {
  return sdk.request(`/events/${eventId}/publish/`, { method: 'POST' }).catch(err => console.log(err))
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
