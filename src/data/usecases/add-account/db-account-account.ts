import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Hasher } from '../../protocols/cryptography/hasher'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })

    return account
  }
}
