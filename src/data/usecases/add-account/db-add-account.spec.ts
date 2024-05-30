import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-account-account'

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (password: string): Promise<string> {
      return `hashed_${password}`
    }
  }

  const encryptStub = new EncrypterStub()
  const sut = new DbAddAccount(encryptStub)

  return {
    sut,
    encryptStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
