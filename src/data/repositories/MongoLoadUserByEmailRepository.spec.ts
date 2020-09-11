import ILoadUserByEmailRepository from '@/domain/definitions/ILoadUserByEmailRepository'
import User from '@/domain/entities/User'
import MissingParamError from '@/utils/errors/MissingParamError'

import { Db, MongoClient } from 'mongodb'

let connection: MongoClient
let db: Db

class MongoLoadUserByEmailRepository implements ILoadUserByEmailRepository {
  async load(email): Promise<User> {
    if (!email) {
      throw new MissingParamError('email')
    }
    const user = await db.collection('users').findOne({ email })
    if (user) {
      return new User(user)
    }

    return null
  }
}

const makeSut = () => {
  const sut = new MongoLoadUserByEmailRepository()
  return { sut }
}

describe('MongoLoadUserByEmailRepository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db()
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
})
