import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../config/app'
import env from '../../config/env'

describe('Post Routes', () => {
  let postCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    postCollection = MongoHelper.getCollection('posts')
    await postCollection.deleteMany({})

    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

  test('Should return 200 on create post if valid auth', async () => {
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const accessToken = sign({ id: res.insertedId.toString() }, env.jwtSecret)

    await accountCollection.updateOne({
      _id: res.insertedId
    }, {
      $set: {
        accessToken
      }
    })

    await request(app)
      .post('/api/post')
      .set('x-access-token', accessToken)
      .send({
        name: 'any_name',
        content: 'any_content',
        userId: 'any_user_id'
      })
      .expect(200)
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
