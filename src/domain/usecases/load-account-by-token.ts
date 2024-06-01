import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  loadAccountByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}
