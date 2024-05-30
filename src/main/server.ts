import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
