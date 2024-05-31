import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  private readonly authentication: Authentication

  constructor (authentication: Authentication) {
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
