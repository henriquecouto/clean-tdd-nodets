import { Db, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient
  db: Db

  constructor(public uri: string) {}

  async connect() {
    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.db = this.client.db()
  }

  async disconnect() {
    await this.client.close()
    this.client = null
    this.db = null
  }

  async getCollection(name: string) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect()
    }
    return this.db.collection(name)
  }
}

export default MongoHelper
