import { DbAddAccount } from '../../data/usecases/add-account/db-account-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'

export const makeSignUpController = (): SignUpController => {
  const accountRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter(12)
  const dbAddAccount = new DbAddAccount(encrypter, accountRepository)
  const signUpController = new SignUpController(dbAddAccount)
  return signUpController
}