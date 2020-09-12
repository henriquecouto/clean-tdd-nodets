import jwt from 'jsonwebtoken'
import TokenGenerator from './TokenGenerator'

jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  payload: '',
  secret: '',
  sign(payload: string, secret: string) {
    this.payload = payload
    this.secret = secret
    return this.token
  },
}))

const makeSut = () => {
  const sut = new TokenGenerator('any_secret')
  return { sut }
}

describe('TokenGenerator', () => {
  test('Should return null if JWT returns null', async () => {
    const { sut } = makeSut()
    // @ts-ignore
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should call JWT with correct params', async () => {
    const { sut } = makeSut()
    await sut.generate('any_id')
    // @ts-ignore
    expect(jwt.payload).toEqual({ id: 'any_id' })
    // @ts-ignore
    expect(jwt.secret).toBe('any_secret')
  })
})
