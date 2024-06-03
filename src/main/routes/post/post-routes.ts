import { Router } from 'express'
import { makeCreatePostController } from '../../factories/create-post/create-post-factory'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeLoadPostController } from '../../factories/load-post/load-post-factory'

export default (router: Router): void => {
  router.post('/post', adaptRoute(makeCreatePostController()))
  router.get('/post', adaptRoute(makeLoadPostController()))
}
