import MongoHelper from '@/data/helpers/MongoHelper'

const mongo = MongoHelper.getInstance()

export default (callback) => {
  mongo.connect().then(callback)
}
