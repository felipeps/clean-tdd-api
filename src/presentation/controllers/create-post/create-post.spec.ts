import { AddPost } from '../../../domain/usecases/add-post'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller } from '../../protocols/controller'
import { CreatePostController } from './create-post'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddPost = (): AddPost => {
  class AddPostStub implements AddPost {
    async add (post: any): Promise<any> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new AddPostStub()
}

interface SutTypes {
  sut: CreatePostController
  validationStub: Validation
  addPostStub: AddPost
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addPostStub = makeAddPost()
  const sut = new CreatePostController(validationStub, addPostStub)
  return {
    sut,
    validationStub,
    addPostStub
  }
}

describe('CreatePost Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        content: 'any_email@mail.com',
        userId: 'any_user_id'
      }
    }

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpRequest = {
      body: {
        name: 'any_name',
        content: 'any_email@mail.com',
        userId: 'any_user_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddPost with correct values', async () => {
    const { sut, addPostStub } = makeSut()
    const addSpy = jest.spyOn(addPostStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        content: 'any_email@mail.com',
        userId: 'any_user_id'
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      content: 'any_email@mail.com',
      userId: 'any_user_id'
    })
  })

  test('Should return 500 if AddPost throws', async () => {
    const { sut, addPostStub } = makeSut()

    jest.spyOn(addPostStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        content: 'any_email@mail.com',
        userId: 'any_user_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })
})
