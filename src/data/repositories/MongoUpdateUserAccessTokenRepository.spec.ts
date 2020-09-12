import { Collection } from 'mongodb'
import MongoHelper from '../helpers/MongoHelper'

const mongoHelper = new MongoHelper(process.env.MONGO_URL)
let userModel: Collection

class MongoUpdateUserAccessTokenRepository {
  constructor(private userModel: Collection) {}

  async update(id: string, accessToken: string) {
    return null
  }
}

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
})
