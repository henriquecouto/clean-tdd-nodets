import MissingParamError from '@/utils/errors/missing-param-error'

export interface ILoadUserByEmailRepository {
  email: string
  load: (email: string) => Promise<any>
}

export interface IEncrypter {
  isValid: boolean
  compare: (value: string, hashedValue: string) => Promise<boolean>
}

export interface IAuthUseCase {
  loadUserByEmailRepository: ILoadUserByEmailRepository
  auth: (email: string, password: string) => Promise<string>
}

class AuthUseCase implements IAuthUseCase {
  loadUserByEmailRepository
  encrypter

  constructor(
    loadUserByEmailRepository: ILoadUserByEmailRepository,
    encrypter: IEncrypter
  ) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
  }

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

    return user
  }
}

export default AuthUseCase
