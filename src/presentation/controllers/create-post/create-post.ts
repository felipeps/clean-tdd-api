import { AddPost } from '../../../domain/usecases/add-post'
import { badRequest } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreatePostController implements Controller {
  private readonly validation: Validation
  private readonly addPost: AddPost

  constructor (validation: Validation, addPost: AddPost) {
    this.validation = validation
    this.addPost = addPost
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    this.addPost.add(httpRequest.body)

    return new Promise(resolve => resolve(null))
  }
}
