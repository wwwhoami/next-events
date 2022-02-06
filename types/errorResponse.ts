export interface ErrorResponse {
  data: null
  error: Error
}

interface Error {
  status: number
  name: string
  message: string
  details: {}
}
