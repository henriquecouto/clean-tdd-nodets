import MissingParamError from '@/utils/errors/MissingParamError'
import { Collection } from 'mongodb'

class MongoUpdateUserAccessTokenRepository {
  constructor(private userModel: Collection) {}

  async update(userId: string, accessToken: string) {
    if (!userId) {
      throw new MissingParamError('userId')
    }

    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }

    const { result } = await this.userModel.updateOne(
      { id: userId },
      { $set: { accessToken } }
    )
    return !!result.nModified
  }
}

export default MongoUpdateUserAccessTokenRepository
