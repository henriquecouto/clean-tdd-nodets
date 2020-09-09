import MissingParamError from '@/utils/errors/missing-param-error'
import AuthUseCase from './auth-usecase'

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
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
  class EncrypterSpy {
    isValid = true
    value = ''
    hashedValue = ''
    async compare(value, hashedValue): Promise<boolean> {
      this.value = value
      this.hashedValue = hashedValue
      return this.isValid
    }
  }

  return new EncrypterSpy()
}

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy {
    value = ''
    token = 'access_token'
    async generate(value: string) {
      this.value = value
      return 'access_token'
    }
  }

  return new TokenGeneratorSpy()
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypterSpy()
  const tokenGenerator = makeTokenGeneratorSpy()
  const sut = new AuthUseCase(
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGenerator
  )
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy, tokenGenerator }
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

  test('Should call encrypter with correct params', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('valid@email.com', 'valid_password')

    expect(encrypterSpy.hashedValue).toBe(
      loadUserByEmailRepositorySpy.user.password
    )
    expect(encrypterSpy.value).toBe('valid_password')
  })

  test('Should call token generator with correct user id', async () => {
    const { sut, tokenGenerator, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid@email.com', 'valid_password')
    expect(tokenGenerator.value).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return an access token if correct credentials are provided', async () => {
    const { sut, tokenGenerator } = makeSut()
    const accessToken = await sut.auth('valid@email.com', 'valid_password')
    expect(accessToken).toBe(tokenGenerator.token)
  })
})
