import validator from 'validator'

jest.mock('validator', () => ({
  isEmailValid: true,
  isEmail() {
    return this.isEmailValid
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
    expect(isValid).toBe(validator.isEmailValid)
  })

  test('Should return false if validator returns false', async () => {
    const sut = new EmailValidator()
    // @ts-ignore
    validator.isEmailValid = false
    const isValid = await sut.verify('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isEmailValid)
  })
})
