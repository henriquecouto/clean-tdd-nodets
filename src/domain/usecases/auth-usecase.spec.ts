class AuthUseCase {
  async auth(email: string) {
    if (!email) {
      throw new Error()
    }
  }
}

describe('Auth Use Case', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth(null)
    expect(promise).rejects.toThrow(new Error())
  })
})
