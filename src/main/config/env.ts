export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/rest-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'jTsmh-351!'
}
