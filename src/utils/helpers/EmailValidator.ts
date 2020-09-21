import validator from 'validator'

class EmailValidator {
  async verify(email: string): Promise<boolean> {
    return validator.isEmail(email)
  }
}

export default EmailValidator
