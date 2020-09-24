import MongoHelper from './MongoHelper'

describe('MongoHelper', () => {
  const sut = MongoHelper.getInstance()

  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect when getCollection is invoked and client is disconnected', async () => {
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getCollection('any_collection')
    expect(sut.db).toBeTruthy()
  })
})
