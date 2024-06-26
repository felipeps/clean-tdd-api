import { PostModel } from '../../../domain/models/post'
import { LoadPostModel } from '../../../domain/usecases/load-post'
import { LoadPostRepository } from '../../protocols/db/load-post-repository'
import { DbLoadPost } from './db-load-post'

const makeLoadPostRepository = (): LoadPostRepository => {
  class LoadPostRepositoryStub {
    async load (postData: LoadPostModel): Promise<PostModel[]> {
      return [{
        id: 'valid_id',
        name: 'valid_name',
        content: 'valid_content',
        userId: 'valid_user_id'
      }]
    }
  }

  return new LoadPostRepositoryStub()
}

interface SutTypes {
  sut: DbLoadPost
  loadPostRepositoryStub: LoadPostRepository
}

const makeSut = (): SutTypes => {
  const loadPostRepositoryStub = makeLoadPostRepository()
  const sut = new DbLoadPost(loadPostRepositoryStub)

  return {
    sut,
    loadPostRepositoryStub
  }
}

describe('DbLoadPost Usecase', () => {
  test('Should call LoadPostRepository with correct values', async () => {
    const { sut, loadPostRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadPostRepositoryStub, 'load')
    const postData = {
      name: 'valid_name',
      userId: 'valid_user_id'
    }

    await sut.load(postData)

    expect(loadSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      userId: 'valid_user_id'
    })
  })

  test('Should call LoadPostRepository with null values', async () => {
    const { sut, loadPostRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadPostRepositoryStub, 'load')
    const postData = {}

    await sut.load(postData)

    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should throw if LoadPostRepository throws', async () => {
    const { sut, loadPostRepositoryStub } = makeSut()

    jest.spyOn(loadPostRepositoryStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const postData = {
      name: 'valid_name',
      userId: 'valid_user_id'
    }

    expect(sut.load(postData)).rejects.toThrow()
  })

  test('Should return list of posts on success', async () => {
    const { sut } = makeSut()
    const postData = {}
    const account = await sut.load(postData)

    expect(account).toEqual([{
      id: 'valid_id',
      name: 'valid_name',
      content: 'valid_content',
      userId: 'valid_user_id'
    }])
  })
})
