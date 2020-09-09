import MissingParamError from '@/utils/errors/missing-param-error'

export interface ILoadUserByEmailRepository {
  email: string
  load: (email: string) => Promise<any>
}

export interface IAuthUseCase {
  loadUserByEmailRepository: ILoadUserByEmailRepository
  auth: (email: string, password: string) => Promise<string>
}

class AuthUseCase implements IAuthUseCase {
  loadUserByEmailRepository

  constructor(loadUserByEmailRepository: ILoadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth(email, password): Promise<string> {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) {
      return null
    }

    return user
  }
}

export default AuthUseCase
