import { PostModel } from '../models/post'

export interface LoadPostModel {
    name?: string
    userId?: string
}

export interface LoadPost {
    load (post: LoadPostModel): Promise<PostModel[]>
}
