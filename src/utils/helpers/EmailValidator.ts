import validator from 'validator'
import MissingParamError from '../errors/MissingParamError'
import IEmailValidator from './definitions/IEmailValidator'

class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    if (!email) {
      throw new MissingParamError('email')
    }
    return validator.isEmail(email)
  }
}

export default EmailValidator
