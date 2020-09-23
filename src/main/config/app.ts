import express from 'express'
import env from './env'

const app = express()

export default () =>
  app.listen(env.port, () => {
    console.log('🏴 App running!')
  })
