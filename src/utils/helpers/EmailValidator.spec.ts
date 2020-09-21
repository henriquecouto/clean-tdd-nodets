import validator from 'validator'
import EmailValidator from './EmailValidator'

jest.mock('validator', () => ({
  isEmailValid: true,
  isEmail() {
    return this.isEmailValid
  },
}))

const makeSut = () => {
  const sut = new EmailValidator()
  return { sut }
}

describe('EmailValidator', () => {
  test('Should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isEmailValid)
  })

  test('Should return false if validator returns false', () => {
    const { sut } = makeSut()
    // @ts-ignore
    validator.isEmailValid = false
    const isValid = sut.isValid('any@email.com')
    // @ts-ignore
    expect(isValid).toBe(validator.isEmailValid)
  })
})
