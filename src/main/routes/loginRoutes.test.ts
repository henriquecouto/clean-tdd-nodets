import MongoHelper from '@/data/helpers/MongoHelper'
import { Collection } from 'mongodb'
import bcrypt from 'bcrypt'
import request from 'supertest'
import app from '../config/app'

const mongoHelper = MongoHelper.getInstance()
let userModel: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect()
    userModel = await mongoHelper.getCollection('users')
  })

  afterAll(async () => {
    await userModel.drop()
    await mongoHelper.disconnect()
  })

  test('Should return 200 if correct credentials are provided', async () => {
    await userModel.insertOne({
      email: 'valid@mail.com',
      password: bcrypt.hashSync('hashed_password', 10),
    })

    await request(app)
      .post('/api/login')
      .send({
        email: 'valid@mail.com',
        password: 'hashed_password',
      })
      .expect(200)
  })
})
