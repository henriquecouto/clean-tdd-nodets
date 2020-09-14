import MissingParamError from '@/utils/errors/MissingParamError'
import HttpRequest from '../helpers/HttpRequest'
import LoginRouter from './LoginRouter'

const makeSut = () => {
  const sut = new LoginRouter()
  return { sut }
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
})
