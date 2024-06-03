import { LoadPost } from '../../../domain/usecases/load-post'
import { LoadPostController } from './load-post'

const makeLoadPost = (): LoadPost => {
  class LoadPostStub implements LoadPost {
    async load (post: any): Promise<any> {
      return [
        {
          id: 'valid_id',
          name: 'any_name',
          content: 'any_content'
        },
        {
          id: 'valid_id_2',
          name: 'any_name_2',
          content: 'any_content_2'
        }
      ]
    }
  }
  return new LoadPostStub()
}

interface SutTypes {
  sut: LoadPostController
  loadPostStub: LoadPost

}

const makeSut = (): SutTypes => {
  const loadPostStub = makeLoadPost()
  const sut = new LoadPostController(loadPostStub)
  return {
    sut,
    loadPostStub
  }
}

describe('LoadPost Controller', () => {
  test('Should call LoadPost with correct values', async () => {
    const { sut, loadPostStub } = makeSut()
    const addSpy = jest.spyOn(loadPostStub, 'load')
    const httpRequest = {
      body: {
        name: 'any_name',
        userId: 'any_user_id'
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      userId: 'any_user_id'
    })
  })

  test('Should call LoadPost with null values', async () => {
    const { sut, loadPostStub } = makeSut()
    const addSpy = jest.spyOn(loadPostStub, 'load')

    await sut.handle({
      body: {}
    })

    expect(addSpy).toHaveBeenCalledWith({})
  })
})
