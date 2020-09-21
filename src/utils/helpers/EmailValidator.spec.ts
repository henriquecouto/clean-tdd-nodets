import validator from 'validator'
import EmailValidator from './EmailValidator'

jest.mock('validator', () => ({
  isEmailValid: true,
  isEmail() {
    return this.isEmailValid
  },
}))

describe('EmailValidator', () => {
  test('Should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isEmailValid)
  })

  test('Should return false if validator returns false', () => {
    const sut = new EmailValidator()
    // @ts-ignore
    validator.isEmailValid = false
    const isValid = sut.isValid('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isEmailValid)
  })
})
