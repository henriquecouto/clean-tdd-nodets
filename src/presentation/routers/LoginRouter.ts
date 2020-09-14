import InvalidParamError from '@/utils/errors/InvalidParamError'
import MissingParamError from '@/utils/errors/MissingParamError'
import HttpRequest from '../helpers/HttpRequest'
import { MakeHttpResponse } from '../helpers/HttpResponse'

interface IEmailValidator {
  isValid: (email: string) => boolean
}
class LoginRouter {
  constructor(private emailValidator: IEmailValidator) {}
  async route(httpRequest: HttpRequest) {
    if (!httpRequest.body.email) {
      return MakeHttpResponse.badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password) {
      return MakeHttpResponse.badRequest(new MissingParamError('password'))
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return MakeHttpResponse.badRequest(new InvalidParamError('email'))
    }
  }
}

export default LoginRouter
