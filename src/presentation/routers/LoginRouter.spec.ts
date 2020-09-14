import HttpRequest from '../helpers/HttpRequest'
import LoginRouter from './LoginRouter'

describe('LoginRouter', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        password: 'any_password',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new Error('Invalid Email').message)
  })

  test('Should return 400 if no password is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        email: 'any@email.com',
      },
    })
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new Error('Invalid Password').message)
  })
})
