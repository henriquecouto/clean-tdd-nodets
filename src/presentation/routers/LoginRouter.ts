import HttpRequest from '../helpers/HttpRequest'
import HttpResponse from '../helpers/HttpResponse'

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

export default LoginRouter
