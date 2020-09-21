import IUpdateUserAccessTokenRepository from '@/data/repositories/definitions/IUpdateUserAccessTokenRepository'
import MissingParamError from '@/utils/errors/MissingParamError'
import { Collection } from 'mongodb'

class MongoUpdateUserAccessTokenRepository
  implements IUpdateUserAccessTokenRepository {
  constructor(private userModel: Collection) {}

  async update(userId: string, accessToken: string) {
    if (!userId) {
      throw new MissingParamError('userId')
    }

    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }

    await this.userModel.updateOne({ id: userId }, { $set: { accessToken } })
  }
}

export default MongoUpdateUserAccessTokenRepository
