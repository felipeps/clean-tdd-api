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

  describe('add()', () => {
    test('Should return a post on add success', async () => {
      const sut = new PostMongoRepository()
      const post = await sut.add({
        name: 'any_name',
        content: 'any_content',
        userId: 'any_user_id'
      })
      expect(post).toBeTruthy()
      expect(post.id).toBeTruthy()
      expect(post.name).toBe('any_name')
      expect(post.content).toBe('any_content')
      expect(post.userId).toBe('any_user_id')
    })
  })

  describe('load()', () => {
    test('Should return list of posts on load success filtering by name', async () => {
      const sut = new PostMongoRepository()

      await postCollection.insertMany([
        {
          name: 'any_name',
          content: 'any_content',
          userId: 'any_user_id'
        },
        {
          name: 'any_name',
          content: 'any_content_2',
          userId: 'any_user_id_2'
        },
        {
          name: 'any_name_3',
          content: 'any_content_3',
          userId: 'any_user_id_3'
        }
      ])

      const posts = await sut.load({
        name: 'any_name'
      })

      expect(posts).toEqual([
        {
          id: expect.any(String),
          name: 'any_name',
          content: 'any_content',
          userId: 'any_user_id'
        },
        {
          id: expect.any(String),
          name: 'any_name',
          content: 'any_content_2',
          userId: 'any_user_id_2'
        }
      ])
    })
  })
})
