import { PostModel } from '../../../domain/models/post'
import { LoadPostModel } from '../../../domain/usecases/load-post'

export interface LoadPostRepository {
  load: (data: LoadPostModel) => Promise<PostModel[]>
}
