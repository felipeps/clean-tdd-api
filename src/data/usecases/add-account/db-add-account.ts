import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Hasher } from '../../protocols/cryptography/hasher'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository, loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (account) {
      return null
    }

    const hashedPassword = await this.hasher.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })

    return newAccount
  }
}
