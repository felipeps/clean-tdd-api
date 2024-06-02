import { PostModel } from '../../../domain/models/post'
import { AddPostModel } from '../../../domain/usecases/add-post'
import { AddPostRepository } from '../../protocols/db/add-post-repository'
import { DbAddPost } from './db-add-post'

const makeAddPostRepository = (): AddPostRepository => {
  class AddPostRepositoryStub {
    async add (postdata: AddPostModel): Promise<PostModel> {
      return {
        id: 'valid_id',
        ...postdata
      }
    }
  }

  return new AddPostRepositoryStub()
}

interface SutTypes {
  sut: DbAddPost
  addPostRepositoryStub: AddPostRepository
}

const makeSut = (): SutTypes => {
  const addPostRepositoryStub = makeAddPostRepository()
  const sut = new DbAddPost(addPostRepositoryStub)

  return {
    sut,
    addPostRepositoryStub
  }
}

describe('DbAddPost Usecase', () => {
  test('Should call AddPostRepository with correct values', async () => {
    const { sut, addPostRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPostRepositoryStub, 'add')
    const postData = {
      name: 'valid_name',
      content: 'valid_content',
      userId: 'valid_user_id'
    }

    await sut.add(postData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      content: 'valid_content',
      userId: 'valid_user_id'
    })
  })

  test('Should throw if AddPostRepository throws', async () => {
    const { sut, addPostRepositoryStub } = makeSut()

    jest.spyOn(addPostRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const postData = {
      name: 'valid_name',
      content: 'valid_content',
      userId: 'valid_user_id'
    }

    expect(sut.add(postData)).rejects.toThrow()
  })
})
