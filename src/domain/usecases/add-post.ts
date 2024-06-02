import { PostModel } from '../models/post'

export interface AddPostModel {
    name: string
    content: string
    userId: string
}

export interface AddPost {
    add (post: AddPostModel): Promise<PostModel>
}
