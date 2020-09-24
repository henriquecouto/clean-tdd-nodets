import HttpRequest from '@/presentation/helpers/HttpRequest'
import IRouter from '@/presentation/routers/definitions/IRouter'
import { Request, Response } from 'express'

class ExpressRouterAdapter {
  static adapt(router: IRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest = new HttpRequest(req)
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

export default ExpressRouterAdapter
