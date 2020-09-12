import MongoUpdateUserAccessTokenRepository from './MongoUpdateUserAccessTokenRepository'
import { Collection } from 'mongodb'
import MongoHelper from '../helpers/MongoHelper'
import MissingParamError from '@/utils/errors/MissingParamError'

const mongoHelper = new MongoHelper(process.env.MONGO_URL)
let userModel: Collection

const makeSut = () => {
  const sut = new MongoUpdateUserAccessTokenRepository(userModel)
  return { sut }
}

describe('MongoUpdateUserAccessTokenRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect()
    userModel = await mongoHelper.getCollection('users')
  })

  afterAll(async () => {
    await userModel.drop()
    await mongoHelper.disconnect()
  })

  test('Should return false if no user finded', async () => {
    const { sut } = makeSut()
    const user = await sut.update('invalid_id', 'any_access')
    expect(user).toBeFalsy()
  })

  test('Should throws if no params are provided', async () => {
    const { sut } = makeSut()
    expect(sut.update(null, null)).rejects.toThrow(
      new MissingParamError('userId')
    )

    expect(sut.update('any_id', null)).rejects.toThrow(
      new MissingParamError('accessToken')
    )
  })

  test('Should update access token if user is finded', async () => {
    const { sut } = makeSut()
    const mockUser = {
      email: 'any@email.com',
      password: 'any_password',
      id: 'any_id',
    }
    await userModel.insertOne(mockUser)
    const result = await sut.update('any_id', 'any_accessToken')
    expect(result).toBeTruthy()

    const updatedUser = await userModel.findOne(mockUser)
    expect(updatedUser.accessToken).toBe('any_accessToken')
  })
})
