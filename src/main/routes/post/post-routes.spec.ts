import request from 'supertest'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../config/app'

describe('Post Routes', () => {
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

  test('Should return 403 on create post if no auth', async () => {
    await request(app)
      .post('/api/post')
      .send({
        name: 'any_name',
        content: 'any_content',
        userId: 'any_user_id'
      })
      .expect(403)
  })

  test('Should return 200 on load post', async () => {
    await request(app)
      .get('/api/post')
      .send({
        name: 'any_name',
        userId: 'any_user_id'
      })
      .expect(200)
  })
})
