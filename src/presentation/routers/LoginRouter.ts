import MissingParamError from '@/utils/errors/MissingParamError'
import HttpRequest from '../helpers/HttpRequest'
import { MakeHttpResponse } from '../helpers/HttpResponse'

class LoginRouter {
  async route(httpRequest: HttpRequest) {
    if (!httpRequest.body.email) {
      return MakeHttpResponse.badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password) {
      return MakeHttpResponse.badRequest(new MissingParamError('password'))
    }
  }
}

export default LoginRouter
