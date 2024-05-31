import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Hasher } from '../../protocols/cryptography/hasher'
import { DbAddAccount } from './db-account-account'

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return {
        id: 'valid_id',
        ...accountData
      }
    }
  }

  return new AddAccountRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub {
    async hash (password: string): Promise<string> {
      return `hashed_${password}`
    }
  }

  return new HasherStub()
}

const makeSut = (): SutTypes => {
  const encryptStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'hash')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, encryptStub } = makeSut()

    jest.spyOn(encryptStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    expect(sut.add(accountData)).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_valid_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    expect(sut.add(accountData)).rejects.toThrow()
  })

  test('Should call an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const account = await sut.add(accountData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_valid_password'
    })
  })
})
