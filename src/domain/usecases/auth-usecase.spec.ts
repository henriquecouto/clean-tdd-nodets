import MissingParamError from '@/utils/errors/missing-param-error'
import AuthUseCase from './auth-usecase'

const makeSut = () => {
  const sut = new AuthUseCase()
  return { sut }
}

describe('Auth Use Case', () => {
  test('Should throw if no email is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth(null, null)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth('any@email.com', null)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
