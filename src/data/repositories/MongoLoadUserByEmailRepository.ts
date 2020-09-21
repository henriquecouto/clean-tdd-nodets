import ILoadUserByEmailRepository from '@/data/repositories/definitions/ILoadUserByEmailRepository'
import User from '@/domain/entities/User'
import MissingParamError from '@/utils/errors/MissingParamError'

import { Collection } from 'mongodb'

class MongoLoadUserByEmailRepository implements ILoadUserByEmailRepository {
  constructor(private userModel: Collection) {}

  async load(email): Promise<User> {
    if (!email) {
      throw new MissingParamError('email')
    }
    const user = await this.userModel.findOne({ email })
    if (user) {
      return new User(user, user.id)
    }

    return null
  }
}

export default MongoLoadUserByEmailRepository
