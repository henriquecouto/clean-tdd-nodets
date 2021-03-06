import MissingParamError from '@/utils/errors/MissingParamError'
import AuthUseCase from './AuthUseCase'

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

const makeHashVerifierSpy = () => {
  class HashVerifierSpy {
    isValid = true
    value = ''
    hashedValue = ''
    async compare(value, hashedValue): Promise<boolean> {
      this.value = value
      this.hashedValue = hashedValue
      return this.isValid
    }
  }

  return new HashVerifierSpy()
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

const makeUpdateUserAccessTokenRepositorySpy = () => {
  class UpdateUserAccessTokenRepositorySpy {
    userId = ''
    token = ''

    async update(userId: string, token: string) {
      this.userId = userId
      this.token = token
    }
  }

  return new UpdateUserAccessTokenRepositorySpy()
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const updateUserAccessTokenRepositorySpy = makeUpdateUserAccessTokenRepositorySpy()
  const hashVerifierSpy = makeHashVerifierSpy()
  const tokenGeneratorSpy = makeTokenGeneratorSpy()
  const sut = new AuthUseCase(
    loadUserByEmailRepositorySpy,
    updateUserAccessTokenRepositorySpy,
    hashVerifierSpy,
    tokenGeneratorSpy
  )
  return {
    sut,
    loadUserByEmailRepositorySpy,
    hashVerifierSpy,
    tokenGeneratorSpy,
    updateUserAccessTokenRepositorySpy,
  }
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
    const { sut, hashVerifierSpy } = makeSut()
    hashVerifierSpy.isValid = false
    const accessToken = await sut.auth('any@email.com', 'invalid_password')
    expect(accessToken).toBeFalsy()
  })

  test('Should call hashVerifier with correct params', async () => {
    const { sut, loadUserByEmailRepositorySpy, hashVerifierSpy } = makeSut()
    await sut.auth('valid@email.com', 'valid_password')

    expect(hashVerifierSpy.hashedValue).toBe(
      loadUserByEmailRepositorySpy.user.password
    )
    expect(hashVerifierSpy.value).toBe('valid_password')
  })

  test('Should call token generator with correct user id', async () => {
    const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid@email.com', 'valid_password')
    expect(tokenGeneratorSpy.value).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return an access token if correct credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const accessToken = await sut.auth('valid@email.com', 'valid_password')
    expect(accessToken).toBe(tokenGeneratorSpy.token)
  })

  test('Should call update access token with correct values', async () => {
    const {
      sut,
      updateUserAccessTokenRepositorySpy,
      loadUserByEmailRepositorySpy,
      tokenGeneratorSpy,
    } = makeSut()
    await sut.auth('valid@email.com', 'valid_password')

    expect(updateUserAccessTokenRepositorySpy.userId).toBe(
      loadUserByEmailRepositorySpy.user.id
    )
    expect(updateUserAccessTokenRepositorySpy.token).toBe(
      tokenGeneratorSpy.token
    )
  })
})
