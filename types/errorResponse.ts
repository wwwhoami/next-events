export interface ErrorResponse {
  error: Error
}

interface Error {
  status: number
  name: string
  message: string
}
