import jwt from 'jsonwebtoken'
import MissingParamError from '../errors/MissingParamError'
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
  beforeEach(() => {
    // @ts-ignore
    jwt.token = 'any_token'
  })

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

  test('Should return token if JWT returns token', async () => {
    const { sut } = makeSut()
    const token = await sut.generate('any_id')
    // @ts-ignore
    expect(token).toBe(jwt.token)
  })

  test('Should throw if no secret is provided', async () => {
    // @ts-ignore
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', async () => {
    const { sut } = makeSut()
    // @ts-ignore
    const promise = sut.generate()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
