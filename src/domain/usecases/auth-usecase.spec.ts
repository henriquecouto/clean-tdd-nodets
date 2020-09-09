class AuthUseCase {
  async auth(email: string, password: string) {
    if (!email) {
      throw new Error()
    }
    if (!password) {
      throw new Error()
    }
  }
}

describe('Auth Use Case', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth(null, null)
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if no password is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any@email.com', null)
    expect(promise).rejects.toThrow(new Error())
  })
})
