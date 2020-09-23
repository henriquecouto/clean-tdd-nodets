import { Router } from 'express'
import fg from 'fast-glob'

const router = Router()

const setupRoutes = (app) => {
  app.use('/api', router)
  fg.sync('**/src/main/routes/**Routes.ts').forEach((file) =>
    require(`../../../${file}`).default(router)
  )
}

export default setupRoutes
