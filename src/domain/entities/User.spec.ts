import User from './User'

describe('User', () => {
  test("Should create a new id if user doesn't have", () => {
    const sut = new User({ email: 'any@email.com', password: 'any_password' })
    expect(sut.id).toBeDefined()
  })
})
