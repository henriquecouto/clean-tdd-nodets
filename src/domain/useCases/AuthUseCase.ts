import MissingParamError from '@/utils/errors/missing-param-error'

export interface IUser {
  id: string
  email: string
  password: string
}
export interface ILoadUserByEmailRepository {
  email: string
  load: (email: string) => Promise<IUser>
}

export interface IEncrypter {
  isValid: boolean
  compare: (value: string, hashedValue: string) => Promise<boolean>
}

export interface ITokenGenerator {
  generate: (value: string) => Promise<string>
}

export interface IUpdateUserAccessTokenRepository {
  update: (userId: string, token: string) => Promise<void>
}

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
