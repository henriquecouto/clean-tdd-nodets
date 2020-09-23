import MongoHelper from '@/data/helpers/MongoHelper'

const mongo = new MongoHelper('mongodb://localhost:27017/clean-tdd-nodets')

export default (callback) => {
  mongo.connect().then(callback)
}
