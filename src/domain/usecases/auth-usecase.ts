import MissingParamError from '@/utils/errors/missing-param-error'

class AuthUseCase {
  async auth(email: string, password: string) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

export default AuthUseCase
