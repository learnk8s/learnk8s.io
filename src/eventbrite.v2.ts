import cheerio from 'cheerio'
import { Sdk } from 'eventbrite/lib/types'
import { State, getVenues, getCourses } from './store'

export async function SyncVenues({state, sdk}: {state: State, sdk: Sdk}): Promise<VenueEventBrite[]> {
  const venues = getVenues(state)
  const response = (await sdk.request(`/organizations/${state.organisationId}/venues/`)) as ResponseVenues
  const { added } = diff({ previous: response.venues.map(it => it.name), current: venues.map(it => it.name) })
  if (added.length === 0) {
    return response.venues
  }
  await Promise.all(
    added.map(venueName => {
      const venue = venues.find(it => it.name === venueName)!
      return addVenue(venue, sdk, state.organisationId)
    }),
  )
  return SyncVenues({state, sdk})
}

export async function SyncEvents({state, sdk}: {state: State, sdk: Sdk}) {
  const events = await getEventsFromEventBrite(state.organisationId, sdk)
  const courses = getCourses(state)
  const { added, unchanged } = diff({ previous: events.map(it => it.code), current: courses.map(it => it.id) })

  await Promise.all(added.map(async courseId => {

  }))

  await Promise.all(unchanged.map(async courseId => {

  }))
}

// export async function syncEvents(
//   log: (...args: any[]) => void,
//   sdk: Sdk,
//   organisationId: string,
//   canPublish: boolean,
//   store: Store<State, Actions>,
// ) {
//   try {
//     const state = store.getState()
//     getVenues(state)

//     const allEvents = Courses.reduce((acc, it) => acc.concat(it.events), [] as CourseEvent[])
//     const venues = await syncVenues(organisationId, sdk)

//     const events = await getEventsFromEventBrite(organisationId, sdk)
//     const [eventsToRemove, existingEvents, eventsToAdd] = diff<
//       { code: string; id: string; details: EventEventBrite },
//       CourseEvent
//     >(it => it.code, events)(allEvents)

//     await Promise.all(
//       eventsToAdd.map(async it => {
//         log(`Creating event for ${it.code}`)
//         const event = await upsertEvent(it, venues, `/organizations/${organisationId}/events/`, sdk)
//         log(`Adding a ticket to ${it.code}`)
//         await upsertTicket(
//           {
//             endpoint: `/events/${event.id}/ticket_classes/`,
//             currencyCode: it.offer.currency,
//             price: it.offer.price,
//           },
//           sdk,
//         )
//         log(`Publishing event ${it.code}`)
//         canPublish ? await publishEvent({ eventId: event.id }, sdk) : null
//       }),
//     )

//     existingEvents.map(async it => {
//       log(`Checking if ${it.details.name.text} requires updates`)
//       const referenceEvent = allEvents.find(event => event.code === it.code)
//       if (!referenceEvent) {
//         log(`Event ${it.details.name.text} could not be found in the official list of events.`)
//         return
//       }
//       if (
//         !isSameDescription(referenceEvent, it.details) ||
//         !isSameDate(referenceEvent, it.details) ||
//         !isSameVenue(referenceEvent, it.details, venues)
//       ) {
//         log(
//           `Updating description and starting date for ${it.details.name.text} (same desc: ${isSameDescription(
//             referenceEvent,
//             it.details,
//           )}, same date: ${isSameDate(referenceEvent, it.details)}, same location: ${isSameVenue(
//             referenceEvent,
//             it.details,
//             venues,
//           )})`,
//         )
//         await upsertEvent(referenceEvent, venues, `/events/${it.id}/`, sdk)
//       }
//       if (!isSamePrice(referenceEvent, it.details)) {
//         log(`Updating ticket price to ${referenceEvent.offer.price} for ${it.details.name.text}`)
//         await upsertTicket(
//           {
//             endpoint: `/events/${it.id}/ticket_classes/${it.details.ticket_classes[0].id}/`,
//             currencyCode: referenceEvent.offer.currency,
//             price: referenceEvent.offer.price,
//           },
//           sdk,
//         )
//       }
//     })
//   } catch (error) {
//     log('ERROR while running the main loop', error)
//   }
// }

// async function syncVenues(organisationId: string, sdk: Sdk): Promise<VenueEventBrite[]> {
//   return sdk.request(`/organizations/${organisationId}/venues/`).then(res => {
//     const response = res as ResponseVenues
//     const [toRemove, existing, toAdd] = diff<VenueEventBrite, Venue>(it => it.name, response.venues)(
//       Object.values(Venues).filter(it => !isVenueOnline(it)),
//     )
//     return toAdd.length > 0
//       ? Promise.all(toAdd.map(it => addVenue(it, sdk, organisationId))).then(() => syncVenues(organisationId, sdk))
//       : response.venues
//   })
// }

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

// function isSameDescription(a: CourseEvent, b: EventEventBrite) {
//   return (
//     cheerio
//       .load(renderDescription(a), { decodeEntities: false })('body')
//       .text() ===
//     cheerio
//       .load(b.description.html || '', { decodeEntities: false })('body')
//       .text()
//   )
// }

// function isSameDate(a: CourseEvent, b: EventEventBrite) {
//   return (
//     moment(a.startAt)
//       .tz(a.timezone)
//       .toISOString() ===
//     moment(b.start.utc)
//       .tz('UTC')
//       .toISOString()
//   )
// }

// function isSamePrice(a: CourseEvent, b: EventEventBrite) {
//   if (b.ticket_classes.length === 0) return false
//   return a.offer.price * 100 === b.ticket_classes[0].cost.value
// }

// function isSameVenue(a: CourseEvent, b: EventEventBrite, venues: VenueEventBrite[]) {
//   if (isVenueOnline(a.location)) {
//     return true
//   }
//   const venue = venues.find(it => it.name === a.location.name)
//   if (!venue) {
//     return false
//   }
//   return venue.id === b.venue_id
// }

// function upsertEvent(event: {}, venues: VenueEventBrite[], endpoint: string, sdk: Sdk) {
//   const body: any = {
//     event: {
//       name: {
//         html: `Advanced Kubernetes course — ${event.location.city || event.location.name}`,
//       },
//       description: {
//         html: renderDescription(event),
//       },
//       start: {
//         timezone: event.timezone,
//         utc: `${moment(event.startAt)
//           .tz('UTC')
//           .format('YYYY-MM-DDTHH:mm:ss')}Z`,
//       },
//       end: {
//         timezone: event.timezone,
//         utc: `${moment(event.startAt.add(event.duration))
//           .tz('UTC')
//           .format('YYYY-MM-DDTHH:mm:ss')}Z`,
//       },
//       currency: event.offer.currency,
//       online_event: true,
//       listed: true,
//       shareable: true,
//       show_remaining: false,
//       logo_id: event.eventbriteLogoId,
//       category_id: 102, // Science and Technology
//       subcategory_id: 2004, // High Tech
//       format_id: 9, // Class, Training, or Workshop (1 for Conference)
//     },
//   }
//   const venue = venues.find(it => it.name === event.location.name)
//   if (!!venue) {
//     body.event.venue_id = venue.id
//     body.event.online_event = false
//   }
//   return sdk
//     .request(endpoint, {
//       method: 'POST',
//       body: JSON.stringify(body),
//     })
//     .then(res => {
//       return { id: (res as any).id as string }
//     })
// }

function addVenue(
  venue: { name: string; address?: string; postcode?: string; city?: string; country?: string; countryCode: string },
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
          name: venue.name,
          address,
        },
      }),
    })
    .then(it => console.log(it))
    .catch(err => console.log(err))
}

// function upsertTicket(
//   { endpoint, currencyCode, price }: { endpoint: string; currencyCode: string; price: number },
//   sdk: Sdk,
// ) {
//   return sdk
//     .request(endpoint, {
//       method: 'POST',
//       body: JSON.stringify({
//         ticket_class: {
//           name: 'Standard',
//           description: `General admission`,
//           quantity_total: 10,
//           cost: `${currencyCode},${price}00`,
//           include_fee: true,
//           hide_description: false,
//           sales_channels: ['online'],
//         },
//       }),
//     })
//     .catch(err => console.log(err))
// }

// function publishEvent({ eventId }: { eventId: string }, sdk: Sdk) {
//   return sdk.request(`/events/${eventId}/publish/`, { method: 'POST' }).catch(err => console.log(err))
// }

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
