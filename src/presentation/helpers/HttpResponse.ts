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
}

export default HttpResponse
