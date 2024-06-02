import { Express, Router } from 'express'
import loginRoutes from '../routes/login/login-routes'
import postRoutes from '../routes/post/post-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  loginRoutes(router)
  postRoutes(router)
}
