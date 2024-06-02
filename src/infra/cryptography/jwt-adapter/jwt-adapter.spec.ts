import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', async () => {
      const sut = new JwtAdapter('secret')
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBeTruthy()
    })

    test('Should throw if sign throws', async () => {
      const sut = new JwtAdapter('secret')

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      expect(sut.encrypt('any_id')).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      const token = jwt.sign({ id: 'any_id' }, 'secret')

      await sut.decrypt(token)

      expect(verifySpy).toHaveBeenCalledWith(token, 'secret')
    })

    test('Should return a token on verify success', async () => {
      const sut = new JwtAdapter('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      const token = jwt.sign({ id: 'any_id' }, 'secret')
      const value = await sut.decrypt(token)

      expect(value).toBeTruthy()
    })

    test('Should throw if verify throws', async () => {
      const sut = new JwtAdapter('secret')

      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })

      expect(sut.decrypt('any_id')).rejects.toThrow()
    })
  })
})
