import MongoHelper from '@/data/helpers/MongoHelper'
import env from './env'

const mongo = new MongoHelper(env.mongoUrl)

export default (callback) => {
  mongo.connect().then(callback)
}
