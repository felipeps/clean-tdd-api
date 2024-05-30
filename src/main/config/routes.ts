import { Express, Router } from 'express'
import signRoutes from '../routes/signup-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signRoutes(router)
}
