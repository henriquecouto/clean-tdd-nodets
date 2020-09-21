import ITokenGenerator from '@/utils/helpers/definitions/ITokenGenerator'
import jwt from 'jsonwebtoken'
import MissingParamError from '../errors/MissingParamError'

class TokenGenerator implements ITokenGenerator {
  constructor(private secret: string) {}

  async generate(id: string): Promise<string> {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }

    if (!id) {
      throw new MissingParamError('id')
    }

    return jwt.sign({ id }, this.secret)
  }
}

export default TokenGenerator
