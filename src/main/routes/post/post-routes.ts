import { Router } from 'express'
import { makeCreatePostController } from '../../factories/create-post/create-post-factory'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeLoadPostController } from '../../factories/load-post/load-post-factory'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../../adapters/express-middleware-adapter'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/post', auth, adaptRoute(makeCreatePostController()))
  router.get('/post', adaptRoute(makeLoadPostController()))
}
