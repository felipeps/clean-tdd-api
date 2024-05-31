import { ValidationComposite } from './validation-composite'

const makeValidation = (): any => {
  class ValidationStub {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validation1 = makeValidation()
    const validation2 = makeValidation()

    validation2.validate = () => {
      return new Error()
    }

    const sut = new ValidationComposite([validation1, validation2])
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error())
  })

  test('Should return the first error if more than one validation fails', () => {
    const validation1 = makeValidation()

    validation1.validate = () => {
      return new Error('first_error')
    }

    const validation2 = makeValidation()

    validation2.validate = () => {
      return new Error('second_error')
    }
    const sut = new ValidationComposite([validation1, validation2])
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error('first_error'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new ValidationComposite([makeValidation()])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
