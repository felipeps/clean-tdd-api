import { PostModel } from '../../../domain/models/post'
import { LoadPost, LoadPostModel } from '../../../domain/usecases/load-post'
import { LoadPostRepository } from '../../protocols/db/load-post-repository'

export class DbLoadPost implements LoadPost {
  private readonly loadPostRepository: LoadPostRepository

  constructor (loadPostRepository: LoadPostRepository) {
    this.loadPostRepository = loadPostRepository
  }

  async load (data: LoadPostModel): Promise<PostModel[]> {
    const posts = await this.loadPostRepository.load(data)
    return posts
  }
}
