import { PostModel } from '../../../../domain/models/post'
import { AddPost, AddPostModel } from '../../../../domain/usecases/add-post'
import { MongoHelper } from '../helpers/mongo-helper'

export class PostMongoRepository implements AddPost {
  async add (postData: AddPostModel): Promise<PostModel> {
    const postCollection = MongoHelper.getCollection('posts')
    const result = await postCollection.insertOne({ ...postData })
    const post = { ...postData, id: result.insertedId.toString() }
    return post
  }
}
