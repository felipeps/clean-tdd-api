import { Router } from 'express'
import { makeCreatePostController } from '../../factories/create-post/create-post-factory'
import { adaptRoute } from '../../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/post', adaptRoute(makeCreatePostController()))
}
