import env from '@/main/config/env'
import { Db, MongoClient } from 'mongodb'

class MongoHelper {
  private static instance: MongoHelper
  client: MongoClient
  db: Db
  uri: string

  private constructor() {
    this.uri = env.mongoUrl
  }

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }
    return MongoHelper.instance
  }

  async connect() {
    MongoHelper.instance.client = await MongoClient.connect(
      MongoHelper.instance.uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    MongoHelper.instance.db = MongoHelper.instance.client.db()
  }

  async disconnect() {
    await MongoHelper.instance.client.close()
    MongoHelper.instance.client = null
    MongoHelper.instance.db = null
  }

  async getCollection(name: string) {
    if (
      !MongoHelper.instance.client ||
      !MongoHelper.instance.client.isConnected()
    ) {
      await MongoHelper.instance.connect()
    }
    return MongoHelper.instance.db.collection(name)
  }
}

export default MongoHelper
