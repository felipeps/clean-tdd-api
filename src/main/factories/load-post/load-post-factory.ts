import { PostMongoRepository } from '../../../infra/db/mongodb/post-repository/post'
import { LoadPostController } from '../../../presentation/controllers/load-post/load-post'
import { Controller } from '../../../presentation/protocols/controller'

export const makeLoadPostController = (): Controller => {
  const postRepository = new PostMongoRepository()
  const loadPostController = new LoadPostController(postRepository)
  return loadPostController
}
