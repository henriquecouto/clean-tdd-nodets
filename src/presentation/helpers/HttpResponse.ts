import ServerError from '../errors/ServerError'
import UnauthorizedError from '../errors/UnauthorizedError'

class HttpResponse {
  public statusCode: number
  public body: any

  constructor(props: HttpResponse) {
    Object.assign(this, props)
  }
}

export class MakeHttpResponse {
  static badRequest(error: Error) {
    return new HttpResponse({ statusCode: 400, body: { error: error.message } })
  }

  static serverError() {
    return new HttpResponse({
      statusCode: 500,
      body: { error: new ServerError().message },
    })
  }

  static unauthorizedError() {
    return new HttpResponse({
      statusCode: 401,
      body: { error: new UnauthorizedError().message },
    })
  }

  static success(response) {
    return new HttpResponse({
      statusCode: 200,
      body: response,
    })
  }
}

export default HttpResponse
