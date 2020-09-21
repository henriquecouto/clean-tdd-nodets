import IAuthUseCase from '@/domain/useCases/definitions/IAuthUseCase'
import InvalidParamError from '@/utils/errors/InvalidParamError'
import MissingParamError from '@/utils/errors/MissingParamError'
import HttpRequest from '../helpers/HttpRequest'
import { MakeHttpResponse } from '../helpers/HttpResponse'

interface IEmailValidator {
  isValid: (email: string) => boolean
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

      const accessToken = await this.authUseCase.auth(
        httpRequest.body.email,
        httpRequest.body.password
      )

      if (!accessToken) {
        return MakeHttpResponse.unauthorizedError()
      }

      return MakeHttpResponse.success({ accessToken })
    } catch (error) {
      return MakeHttpResponse.serverError()
    }
  }
}

export default LoginRouter
