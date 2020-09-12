import jwt from 'jsonwebtoken'
import TokenGenerator from './TokenGenerator'

jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  sign() {
    return this.token
  },
}))

describe('TokenGenerator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = new TokenGenerator('any_secret')
    // @ts-ignore
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
})
