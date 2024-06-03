import { Request, RequestHandler, Response, query } from 'express'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      userId: req.accountId
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
