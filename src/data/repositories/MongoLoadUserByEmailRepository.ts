import ILoadUserByEmailRepository from '@/data/repositories/definitions/ILoadUserByEmailRepository'
import User from '@/domain/entities/User'
import MissingParamError from '@/utils/errors/MissingParamError'

import MongoHelper from '../helpers/MongoHelper'

class MongoLoadUserByEmailRepository implements ILoadUserByEmailRepository {
  async load(email): Promise<User> {
    if (!email) {
      throw new MissingParamError('email')
    }
    const userModel = await MongoHelper.getInstance().getCollection('users')
    const user = await userModel.findOne({ email })
    if (user) {
      return new User(user, user.id)
    }

    return null
  }
}

export default MongoLoadUserByEmailRepository
