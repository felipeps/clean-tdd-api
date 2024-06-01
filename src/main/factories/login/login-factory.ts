import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LoginController } from '../../../presentation/controllers/login/login'
import { Controller } from '../../../presentation/protocols/controller'
import env from '../../config/env'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
  const validations = makeLoginValidation()
  const loginController = new LoginController(authentication, validations)
  return loginController
}
