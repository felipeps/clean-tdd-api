import { Express, Router } from 'express'
import signRoutes from '../routes/login-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signRoutes(router)
}
