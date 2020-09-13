import IEncrypter from '@/domain/definitions/IEncrypter'
import bcrypt from 'bcrypt'
import MissingParamError from '../errors/MissingParamError'

class Encrypter implements IEncrypter {
  async compare(value: string, hashedValue: string): Promise<boolean> {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hashedValue) {
      throw new MissingParamError('hashedValue')
    }

    const isValid = await bcrypt.compare(value, hashedValue)
    return isValid
  }
}

export default Encrypter
