import { Router } from 'express'
import ExpressRouterAdapter from '../adapters/ExpressRouterAdapter'
import LoginRouterComposer from '../composers/LoginRouterComposer'

const loginRoutes = async (router: Router) => {
  router.post(
    '/login',
    ExpressRouterAdapter.adapt(LoginRouterComposer.compose())
  )
}

export default loginRoutes
