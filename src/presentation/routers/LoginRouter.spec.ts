import InvalidParamError from '@/utils/errors/InvalidParamError'
import MissingParamError from '@/utils/errors/MissingParamError'
import ServerError from '../errors/ServerError'
import UnauthorizedError from '../errors/UnauthorizedError'
import HttpRequest from '../helpers/HttpRequest'
import LoginRouter from './LoginRouter'

class EmailValidatorSpy {
  isEmailValid = true
  isValid(email: string): boolean {
    return this.isEmailValid
  }
}

class AuthUseCaseSpy {
  email = ''
  password = ''
  accessToken = 'any_accessToken'
  async auth(email: string, password: string): Promise<string> {
    this.email = email
    this.password = password
    return this.accessToken
  }
}

const makeSut = () => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(emailValidatorSpy, authUseCaseSpy)
  return { sut, emailValidatorSpy, authUseCaseSpy }
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

  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        email: 'valid@email.com',
        password: 'any_password',
      },
    })
    await sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        email: 'invalid@email.com',
        password: 'invalid_password',
      },
    })
    authUseCaseSpy.accessToken = null
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body.error).toBe(new UnauthorizedError().message)
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = new HttpRequest({
      body: {
        email: 'valid@email.com',
        password: 'valid_password',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toBe(authUseCaseSpy.accessToken)
  })
})
