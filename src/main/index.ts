import app from './config/app'
import env from './config/env'
import mongo from './config/mongo'

mongo(
  app.listen(env.port, () => {
    console.log(`🏴 Server running on port ${env.port}`)
  })
)
