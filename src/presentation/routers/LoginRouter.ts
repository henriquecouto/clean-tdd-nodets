import InvalidParamError from '@/utils/errors/InvalidParamError'
import MissingParamError from '@/utils/errors/MissingParamError'
import HttpRequest from '../helpers/HttpRequest'
import { MakeHttpResponse } from '../helpers/HttpResponse'

interface IEmailValidator {
  isValid: (email: string) => boolean
}

interface IAuthUseCase {
  auth: (email: string, password: string) => Promise<string>
}
class LoginRouter {
  constructor(
    private emailValidator: IEmailValidator,
    private authUseCase: IAuthUseCase
  ) {}

  async route(httpRequest: HttpRequest) {
    try {
      if (!httpRequest.body.email) {
        return MakeHttpResponse.badRequest(new MissingParamError('email'))
      }

      if (!httpRequest.body.password) {
        return MakeHttpResponse.badRequest(new MissingParamError('password'))
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return MakeHttpResponse.badRequest(new InvalidParamError('email'))
      }

      this.authUseCase.auth(httpRequest.body.email, httpRequest.body.password)
    } catch (error) {
      return MakeHttpResponse.serverError()
    }
  }
}

export default LoginRouter
