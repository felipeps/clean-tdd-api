import { env } from 'process'
import { DbLoadAccountByToken } from '../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols/middleware'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMongoRepository()
  const loadAccountByToken = new DbLoadAccountByToken(jwtAdapter, accountRepository)
  return new AuthMiddleware(loadAccountByToken)
}
