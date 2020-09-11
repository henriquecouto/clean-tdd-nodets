import User from './User'

describe('User', () => {
  test("Should create a new id if user doesn't have", () => {
    const sut = new User({ email: 'any@email.com', password: 'any_password' })
    expect(sut.id).toBeDefined()
  })

  test('Should user instance has correct values', () => {
    const params = {
      email: 'any@email.com',
      password: 'any_password',
      id: 'any_id',
    }
    const sut = new User(params, params.id)
    expect(sut.email).toBe(params.email)
    expect(sut.password).toBe(params.password)
    expect(sut.id).toBe(params.id)
  })
})
