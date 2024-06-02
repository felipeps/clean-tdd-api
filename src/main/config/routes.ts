import { Express, Router } from 'express'
import signRoutes from '../routes/login-routes'
import postRoutes from '../routes/post-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signRoutes(router)
  postRoutes(router)
}
