import { DbAddAccount } from '../../../data/usecases/add-account/db-account-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const accountRepository = new AccountMongoRepository()
  const hasher = new BcryptAdapter(12)
  const dbAddAccount = new DbAddAccount(hasher, accountRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  return signUpController
}
