import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http-helper'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: any): Promise<any> {
    return forbidden(new AccessDeniedError())
  }
}
