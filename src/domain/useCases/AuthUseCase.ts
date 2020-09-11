import MissingParamError from '@/utils/errors/MissingParamError'
import ILoadUserByEmailRepository from '../definitions/ILoadUserByEmailRepository'
import IUpdateUserAccessTokenRepository from '../definitions/IUpdateUserAccessTokenRepository'
import IEncrypter from '../definitions/IEncrypter'
import ITokenGenerator from '../definitions/ITokenGenerator'

class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
    private updateUserAccessTokenRepository: IUpdateUserAccessTokenRepository,
    private encrypter: IEncrypter,
    private tokenGenerator: ITokenGenerator
  ) {}

  async auth(email, password): Promise<string> {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    const isValid =
      user && (await this.encrypter.compare(password, user.password))

    if (!isValid) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(user.id)
    this.updateUserAccessTokenRepository.update(user.id, accessToken)

    return accessToken
  }
}

export default AuthUseCase