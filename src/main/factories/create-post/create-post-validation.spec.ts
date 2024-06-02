import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeCreatePostValidation } from './create-post-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('CreatePostValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreatePostValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'content', 'userId']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
