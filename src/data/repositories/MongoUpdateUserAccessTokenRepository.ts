import IUpdateUserAccessTokenRepository from '@/data/repositories/definitions/IUpdateUserAccessTokenRepository'
import MissingParamError from '@/utils/errors/MissingParamError'
import MongoHelper from '../helpers/MongoHelper'

class MongoUpdateUserAccessTokenRepository
  implements IUpdateUserAccessTokenRepository {
  async update(userId: string, accessToken: string) {
    if (!userId) {
      throw new MissingParamError('userId')
    }

    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    const userModel = await MongoHelper.getInstance().getCollection('users')
    await userModel.updateOne({ id: userId }, { $set: { accessToken } })
  }
}

export default MongoUpdateUserAccessTokenRepository
