import { NextFunction, Request, RequestHandler, Response, query } from 'express'
import { Middleware } from '../../presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
