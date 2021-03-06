import bcrypt from 'bcrypt'
import MissingParamError from '../errors/MissingParamError'
import HashVerifier from './HashVerifier'

jest.mock('bcrypt', () => ({
  isValid: true,
  async compare(value: string, hashedValue: string) {
    this.value = value
    this.hashedValue = hashedValue
    return this.isValid
  },
}))

const makeSut = () => {
  const sut = new HashVerifier()
  return { sut }
}

describe('HashVerifier', () => {
  test('Should return true if bcrypt returns true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    // @ts-ignore
    expect(isValid).toBe(bcrypt.isValid)
  })

  test('Should return false if bcrypt returns false', async () => {
    const { sut } = makeSut()
    // @ts-ignore
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'any_hash')
    // @ts-ignore
    expect(isValid).toBe(bcrypt.isValid)
  })

  test('Should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    await sut.compare('any_value', 'any_hash')
    // @ts-ignore
    expect(bcrypt.value).toBe('any_value')
    // @ts-ignore
    expect(bcrypt.hashedValue).toBe('any_hash')
  })

  test('Should throw if no params are provided', () => {
    const { sut } = makeSut()
    // @ts-ignore
    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    // @ts-ignore
    expect(sut.compare('any_value')).rejects.toThrow(
      new MissingParamError('hashedValue')
    )
  })
})
