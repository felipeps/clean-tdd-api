import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter
  private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

  constructor (decrypter: Decrypter, loadAccountByTokenRepository: LoadAccountByTokenRepository) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async loadAccountByToken (accessToken: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken)

      if (account) {
        return account
      }
    }

    return null
  }
}
