import InvalidParamError from '@/utils/errors/InvalidParamError'
import MissingParamError from '@/utils/errors/MissingParamError'
import ServerError from '../errors/ServerError'
import HttpRequest from '../helpers/HttpRequest'
import LoginRouter from './LoginRouter'

class EmailValidatorSpy {
  isEmailValid = true
  isValid(email: string): boolean {
    return this.isEmailValid
  }
}

const makeSut = () => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new LoginRouter(emailValidatorSpy)
  return { sut, emailValidatorSpy }
}

describe('LoginRouter', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        password: 'any_password',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('email').message)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        email: 'any@email.com',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(
      new MissingParamError('password').message
    )
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        email: 'invalid@email.com',
        password: 'any_password',
      },
    })
    emailValidatorSpy.isEmailValid = false
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('email').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    // @ts-ignore
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if an invalid httpRequest is provided', async () => {
    const { sut } = makeSut()
    // @ts-ignore
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
