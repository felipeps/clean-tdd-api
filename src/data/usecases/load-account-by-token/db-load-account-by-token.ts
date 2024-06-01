import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter

  constructor (decrypter: Decrypter) {
    this.decrypter = decrypter
  }

  async loadAccountByToken (accessToken: string): Promise<AccountModel> {
    this.decrypter.decrypt(accessToken)
    return null
  }
}
