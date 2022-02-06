import qs from 'qs'
import { ErrorResponse } from '@/types/errorResponse'
import { Event } from '@/types/event'
import { EventImageData, EventResponse } from '@/types/eventResponse'
import { EventsResponse, Meta } from '@/types/eventsResponse'
import { EventImage } from '@/types/ImageUploadResponse'

function imageDeepCopy(image: EventImageData) {
  return {
    ...image.attributes,
    id: image.id,
    formats: {
      ...image.attributes.formats,
      small: { ...image.attributes.formats.small },
      medium: { ...image.attributes.formats.medium },
      large: { ...image.attributes.formats.large },
      thumbnail: { ...image.attributes.formats.thumbnail },
    },
    provider_metadata: { ...image.attributes.provider_metadata },
  }
}

export async function getEvents(
  url: string
): Promise<{ events: Event[]; meta: Meta }> {
  const res = await fetch(url)
  const eventsResponse: EventsResponse | ErrorResponse = await res.json()

  if ('error' in eventsResponse) {
    throw new Error(eventsResponse.error.message)
  }

  const meta = eventsResponse.meta
  const events = eventsResponse.data.map((event) => {
    const { id } = event
    const { name, venue, address, performers, datetime, description, slug } =
      event.attributes

    const eventImage = event.attributes.image?.data
    let image: EventImage | undefined
    if (eventImage) image = imageDeepCopy(eventImage)

    return {
      id,
      name,
      slug,
      venue,
      address,
      performers,
      datetime,
      description,
      image,
    }
  })

  return { events, meta }
}

export async function getEventBySlug(url: string): Promise<Event> {
  const res = await fetch(url)

  const eventResponse: EventsResponse | ErrorResponse = await res.json()

  if ('error' in eventResponse) throw new Error(eventResponse.error.message)

  const { id } = eventResponse.data[0]
  const { name, venue, address, performers, datetime, description, slug } =
    eventResponse.data[0].attributes
  const { meta } = eventResponse

  const eventImage = eventResponse.data[0].attributes.image?.data
  let image: EventImage | undefined
  if (eventImage) image = imageDeepCopy(eventImage)

  return {
    id,
    name,
    slug,
    venue,
    address,
    performers,
    datetime,
    description,
    image,
  }
}

export async function getEventById(url: string): Promise<Event> {
  const res = await fetch(url)

  const eventResponse: EventResponse | ErrorResponse = await res.json()

  if ('error' in eventResponse) throw new Error(eventResponse.error.message)

  const { id } = eventResponse.data
  const { name, venue, address, performers, datetime, description, slug } =
    eventResponse.data.attributes

  const eventImage = eventResponse.data.attributes.image?.data
  let image: EventImage | undefined
  if (eventImage) image = imageDeepCopy(eventImage)

  return {
    id,
    slug,
    name,
    venue,
    address,
    performers,
    datetime,
    description,
    image,
  }
}

export async function getAllEventsSlugs() {
  const url = process.env.NEXT_PUBLIC_API_URL + `/events`
  const search = qs.stringify({
    fields: ['slug'],
  })

  const res = await fetch(`${url}?${search}`)
  const eventsResponse: EventsResponse | ErrorResponse = await res.json()

  if ('error' in eventsResponse) throw new Error(eventsResponse.error.message)

  return eventsResponse.data.map((event) => ({
    params: {
      slug: event.attributes.slug,
    },
  }))
}

export async function uploadImage(formData: FormData) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/upload`

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  const image: EventImage[] | ErrorResponse = await res.json()

  if ('error' in image) throw new Error(image.error.message)

  return image[0]
}
