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

class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
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

    return accessToken
  }
}

export default AuthUseCase
