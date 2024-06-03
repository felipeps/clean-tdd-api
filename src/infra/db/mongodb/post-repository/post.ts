import { AddPostRepository } from '../../../../data/protocols/db/add-post-repository'
import { LoadPostRepository } from '../../../../data/protocols/db/load-post-repository'
import { PostModel } from '../../../../domain/models/post'
import { AddPostModel } from '../../../../domain/usecases/add-post'
import { LoadPostModel } from '../../../../domain/usecases/load-post'
import { MongoHelper } from '../helpers/mongo-helper'

export class PostMongoRepository implements AddPostRepository, LoadPostRepository {
  async add (postData: AddPostModel): Promise<PostModel> {
    const postCollection = MongoHelper.getCollection('posts')
    const result = await postCollection.insertOne({ ...postData })
    const post = { ...postData, id: result.insertedId.toString() }
    return post
  }

  async load (data: LoadPostModel): Promise<PostModel[]> {
    const postCollection = MongoHelper.getCollection('posts')
    const posts = await postCollection.find(data).toArray()
    return posts.map(post => ({
      id: post._id.toString(),
      name: post.name,
      content: post.content,
      userId: post.userId
    }))
  }
}
