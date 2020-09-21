import validator from 'validator'
import EmailValidator from './EmailValidator'

jest.mock('validator', () => ({
  isEmailValid: true,
  isEmail(email: string) {
    this.email = email
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

  test('Should calls validator with correct email', () => {
    const { sut } = makeSut()
    sut.isValid('any@email.com')
    // @ts-ignore
    expect(validator.email).toBe('any@email.com')
  })
})
