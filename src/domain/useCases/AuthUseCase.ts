import MissingParamError from '@/utils/errors/MissingParamError'
import ILoadUserByEmailRepository from '../definitions/ILoadUserByEmailRepository'
import IUpdateUserAccessTokenRepository from '../definitions/IUpdateUserAccessTokenRepository'
import IHashVerifier from '../definitions/IHashVerifier'
import ITokenGenerator from '../definitions/ITokenGenerator'
import IAuthUseCase from './definitions/IAuthUseCase'

class AuthUseCase implements IAuthUseCase {
  constructor(
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
    private updateUserAccessTokenRepository: IUpdateUserAccessTokenRepository,
    private hashVerifier: IHashVerifier,
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
      user && (await this.hashVerifier.compare(password, user.password))

    if (!isValid) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(user.id)
    this.updateUserAccessTokenRepository.update(user.id, accessToken)

    return accessToken
  }
}

export default AuthUseCase
