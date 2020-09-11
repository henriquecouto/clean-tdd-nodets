import MissingParamError from '@/utils/errors/MissingParamError'
import MongoLoadUserByEmailRepository from './MongoLoadUserByEmailRepository'

import { Collection, MongoClient } from 'mongodb'

let connection: MongoClient
let userModel: Collection

const makeSut = () => {
  const sut = new MongoLoadUserByEmailRepository(userModel)
  return { sut }
}

describe('MongoLoadUserByEmailRepository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    userModel = await connection.db().collection('users')
  })

  afterAll(async () => {
    await connection.close()
  })

  test('Should return null if no user finded', async () => {
    const { sut } = makeSut()
    const user = await sut.load('any@email.com')
    expect(user).toBeNull()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.load(null)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should return user if a user is finded', async () => {
    const { sut } = makeSut()
    const mockUser = {
      email: 'any@email.com',
      password: 'any_password',
      id: 'any_id',
    }
    await userModel.insertOne(mockUser)

    const user = await sut.load(mockUser.email)
    expect(user).toEqual(mockUser)
  })
})
