class HttpResponse {
  public statusCode: number
  public body: any

  constructor(props) {
    Object.assign(this, props)
  }
}

export default HttpResponse
