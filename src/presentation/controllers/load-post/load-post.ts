import { LoadPost } from '../../../domain/usecases/load-post'
import { serverError } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadPostController implements Controller {
  private readonly loadPost: LoadPost

  constructor (loadPost: LoadPost) {
    this.loadPost = loadPost
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.loadPost.load(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
