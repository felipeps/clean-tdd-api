import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  loadAccountByToken: (accessToken: string) => Promise<AccountModel>
}
