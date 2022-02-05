import { EventImage } from './ImageUploadResponse'

export type Event = {
  id: string
  name: string
  slug: string
  venue: string
  address: string
  performers: string
  datetime: string
  description: string
  image?: EventImage
}
