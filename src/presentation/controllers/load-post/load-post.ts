import { LoadPost } from '../../../domain/usecases/load-post'
import { ok, serverError } from '../../helpers/http-helper'
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
      const posts = await this.loadPost.load(httpRequest.body)
      return ok(posts)
    } catch (error) {
      return serverError(error)
    }
  }
}
