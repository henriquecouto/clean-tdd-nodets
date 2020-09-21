import validator from 'validator'
import IEmailValidator from './definitions/IEmailValidator'

class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}

export default EmailValidator
