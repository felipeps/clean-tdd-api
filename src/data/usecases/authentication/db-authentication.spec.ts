import { AccountModel } from '../../../domain/models/account'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { Encrypter } from '../../protocols/cryptography/encrypter'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'
import { DbAuthentication } from './db-authentication'

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashCompareStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

const makeFakeAuthentication = (): { email: string, password: string } => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const fakeAuthentication = makeFakeAuthentication()

    await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(loadSpy).toHaveBeenLastCalledWith('valid_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const fakeAuthentication = makeFakeAuthentication()

    expect(sut.auth(fakeAuthentication.email, fakeAuthentication.password)).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const fakeAuthentication = makeFakeAuthentication()
    const accessToken = await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()

    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const fakeAuthentication = makeFakeAuthentication()

    await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(compareSpy).toHaveBeenCalledWith('valid_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })

    const fakeAuthentication = makeFakeAuthentication()

    expect(sut.auth(fakeAuthentication.email, fakeAuthentication.password)).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const fakeAuthentication = makeFakeAuthentication()
    const accessToken = await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeAuthentication = makeFakeAuthentication()

    await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(encryptSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })

    const fakeAuthentication = makeFakeAuthentication()

    expect(sut.auth(fakeAuthentication.email, fakeAuthentication.password)).rejects.toThrow()
  })

  test('Should return accessToken on success', async () => {
    const { sut } = makeSut()
    const fakeAuthentication = makeFakeAuthentication()
    const accessToken = await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    const fakeAuthentication = makeFakeAuthentication()

    await sut.auth(fakeAuthentication.email, fakeAuthentication.password)

    expect(updateSpy).toHaveBeenCalledWith('valid_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(() => {
      throw new Error()
    })

    const fakeAuthentication = makeFakeAuthentication()

    expect(sut.auth(fakeAuthentication.email, fakeAuthentication.password)).rejects.toThrow()
  })
})
