const config = require('../config/app')

const dbConfig = {
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeData'
}


module.exports = {
  development: dbConfig,
  test: dbConfig,
  staging: dbConfig,
  production: dbConfig
}
