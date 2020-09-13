import bcrypt from 'bcrypt'
import Encrypter from './Encrypter'

jest.mock('bcrypt', () => ({
  isValid: true,
  async compare(value: string, hashedValue: string) {
    this.value = value
    this.hashedValue = hashedValue
    return this.isValid
  },
}))

const makeSut = () => {
  const sut = new Encrypter()
  return { sut }
}

describe('Encrypter', () => {
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
})
