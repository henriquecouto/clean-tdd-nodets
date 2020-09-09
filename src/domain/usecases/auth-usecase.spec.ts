class MissingParamError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MissingParamError'
  }
}

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

describe('Auth Use Case', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth(null, null)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any@email.com', null)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
