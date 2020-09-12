import ITokenGenerator from '@/domain/definitions/ITokenGenerator'
import jwt from 'jsonwebtoken'

class TokenGenerator implements ITokenGenerator {
  constructor(private secret: string) {}

  async generate(id: string): Promise<string> {
    return jwt.sign({ id }, this.secret)
  }
}

export default TokenGenerator
