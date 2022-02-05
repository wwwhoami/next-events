export interface EventImage {
  id: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata: ProviderMetadata
  createdAt: string
  updatedAt: string
}

interface Formats {
  thumbnail: Large
  large: Large
  medium: Large
  small: Large
}

interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path: null
  url: string
  provider_metadata: ProviderMetadata
}

interface ProviderMetadata {
  public_id: string
  resource_type: string
}
