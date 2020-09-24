import { Express } from 'express'
import contentType from '../middlewares/contentType'
import cors from '../middlewares/cors'
import jsonParser from '../middlewares/jsonParser'

const setupApp = (app: Express) => {
  app.disable('x-powered-by')
  app.use(jsonParser)
  app.use(cors)
  app.use(contentType)
}

export default setupApp
