import { Express } from 'express'

const setupApp = (app: Express) => {
  app.disable('x-powered-by')
}

export default setupApp
