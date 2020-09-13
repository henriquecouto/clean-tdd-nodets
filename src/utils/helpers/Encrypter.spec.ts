import bcrypt from 'bcrypt'
import Encrypter from './Encrypter'

jest.mock('bcrypt', () => ({
  isValid: true,
  async compare(value: string, hashedValue: string) {
    return this.isValid
  },
}))

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'any_hash')
    // @ts-ignore
    expect(isValid).toBe(bcrypt.isValid)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = new Encrypter()
    // @ts-ignore
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'any_hash')
    // @ts-ignore
    expect(isValid).toBe(bcrypt.isValid)
  })
})
