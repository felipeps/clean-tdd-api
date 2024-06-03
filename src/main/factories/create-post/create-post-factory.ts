import { PostMongoRepository } from '../../../infra/db/mongodb/post-repository/post'
import { CreatePostController } from '../../../presentation/controllers/create-post/create-post'
import { Controller } from '../../../presentation/protocols/controller'
import { makeCreatePostValidation } from './create-post-validation'

export const makeCreatePostController = (): Controller => {
  const validations = makeCreatePostValidation()
  const postRepository = new PostMongoRepository()
  const createPostController = new CreatePostController(validations, postRepository)
  return createPostController
}
