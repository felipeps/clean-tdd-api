import { MissingParamError } from '../../errors/missing-param-error'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
