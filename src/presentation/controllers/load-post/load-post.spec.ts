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
      query: {
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
      query: {}
    })

    expect(addSpy).toHaveBeenCalledWith({})
  })

  test('Should return 500 if LoadPost throws', async () => {
    const { sut, loadPostStub } = makeSut()

    jest.spyOn(loadPostStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      query: {
        name: 'any_name',
        userId: 'any_user_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
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
    ])
  })
})
