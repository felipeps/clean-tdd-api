import { PostModel } from '../../../domain/models/post'
import { AddPostModel } from '../../../domain/usecases/add-post'

export interface AddPostRepository {
    add: (postData: AddPostModel) => Promise<PostModel>
}
