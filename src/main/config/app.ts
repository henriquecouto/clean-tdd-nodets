import express from 'express'
const app = express()

export default () =>
  app.listen(3000, () => {
    console.log('🏴 App running!')
  })
