class HttpRequest {
  public body: any

  constructor(props) {
    Object.assign(this, props)
  }
}

class HttpResponse {
  public statusCode: number
  public body: any

  constructor(props) {
    Object.assign(this, props)
  }
}

class LoginRouter {
  async route(httpRequest: HttpRequest) {
    return new HttpResponse({
      statusCode: 400,
      body: { error: new Error('Invalid Email').message },
    })
  }
}

describe('LoginRouter', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        password: 'any_password',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new Error('Invalid Email').message)
  })
})
