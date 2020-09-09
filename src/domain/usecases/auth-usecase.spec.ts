import MissingParamError from '@/utils/errors/missing-param-error'
import AuthUseCase, {
  ILoadUserByEmailRepository,
  IEncrypter,
} from './auth-usecase'

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy implements ILoadUserByEmailRepository {
    email = ''
    user = {
      id: 'any_id',
      password: 'hashed_password',
    }

    async load(email): Promise<any> {
      this.email = email
      return this.user
    }
  }

  return new LoadUserByEmailRepositorySpy()
}

const makeEncrypterSpy = () => {
  class EncrypterSpy implements IEncrypter {
    isValid = true
    async compare(value, hashedValue): Promise<boolean> {
      return this.isValid
    }
  }

  return new EncrypterSpy()
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypterSpy()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy)
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy }
}

describe('Auth Use Case', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth(null, null)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any@email.com', null)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any@email.com')
  })

  test('Should return null if an user with email is not found', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('any@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    const { sut, encrypterSpy } = makeSut()
    encrypterSpy.isValid = false
    const accessToken = await sut.auth('any@email.com', 'invalid_password')
    expect(accessToken).toBeFalsy()
  })
})
