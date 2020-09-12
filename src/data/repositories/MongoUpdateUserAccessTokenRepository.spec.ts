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
    await mongoHelper.disconnect()
  })

  test('Should return null if no user finded', async () => {
    const { sut } = makeSut()
    const user = await sut.update('invalid_id', 'any_access')
    expect(user).toBeNull()
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
})
