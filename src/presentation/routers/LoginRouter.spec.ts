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
    if (!httpRequest.body.email) {
      return new HttpResponse({
        statusCode: 400,
        body: { error: new Error('Invalid Email').message },
      })
    }

    if (!httpRequest.body.password) {
      return new HttpResponse({
        statusCode: 400,
        body: { error: new Error('Invalid Password').message },
      })
    }
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

  test('Should return 400 if no password is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        email: 'any@email.com',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new Error('Invalid Password').message)
  })
})
