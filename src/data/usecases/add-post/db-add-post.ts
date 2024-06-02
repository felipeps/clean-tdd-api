import { AddPost, AddPostModel } from '../../../domain/usecases/add-post'
import { AddPostRepository } from '../../protocols/db/add-post-repository'
import { PostModel } from '../../../domain/models/post'

export class DbAddPost implements AddPost {
  private readonly addPostRepository: AddPostRepository

  constructor (addPostRepository: AddPostRepository) {
    this.addPostRepository = addPostRepository
  }

  async add (postData: AddPostModel): Promise<PostModel> {
    const newPost = await this.addPostRepository.add(postData)
    return newPost
  }
}
