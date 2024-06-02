import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { PostMongoRepository } from './post'

describe('Post Mongo Repository', () => {
  let postCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    postCollection = MongoHelper.getCollection('posts')
    await postCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a post on add success', async () => {
    const sut = new PostMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      content: 'any_content',
      userId: 'any_user_id'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.content).toBe('any_content')
    expect(account.userId).toBe('any_user_id')
  })
})
