import IEncrypter from '@/domain/definitions/IEncrypter'
import bcrypt from 'bcrypt'

class Encrypter implements IEncrypter {
  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashedValue)
    return isValid
  }
}

export default Encrypter
