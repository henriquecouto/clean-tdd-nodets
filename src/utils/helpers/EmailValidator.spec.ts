import validator from 'validator'

jest.mock('validator', () => ({
  isValid: true,
  isEmail() {
    return this.isValid
  },
}))

class EmailValidator {
  async verify(email: string): Promise<boolean> {
    return validator.isEmail(email)
  }
}

describe('EmailValidator', () => {
  test('Should return true if validator returns true', async () => {
    const sut = new EmailValidator()
    const isValid = await sut.verify('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isValid)
  })
})
