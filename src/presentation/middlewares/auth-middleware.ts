import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  private readonly loadAccountByToken: LoadAccountByToken

  constructor (loadAccountByToken: LoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }

    const account = this.loadAccountByToken.loadAccountByToken(accessToken)

    if (!account) {
      return forbidden(new AccessDeniedError())
    }
  }
}
