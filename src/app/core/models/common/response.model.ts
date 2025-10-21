export class ResponseModel<T> {
  code: string
  message: string
  error: boolean
  status: number
  data: T

  constructor(
    code: string,
    message: string,
    error: boolean,
    status: number,
    data: T
  ) {
    this.code = code
    this.error = error
    this.message = message
    this.status = status
    this.data = data
  }
}
