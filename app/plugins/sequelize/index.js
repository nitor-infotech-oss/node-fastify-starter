import fastifyPlugin from 'fastify-plugin'
import Sequelize from 'sequelize'
import config from '../../../config/app'

const dbConfig = config.get('db')

function sequelizeDB(fastify, options, next) {
  const sequelize = new Sequelize(
    dbConfig.name,
    dbConfig.user,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  )

  sequelize
    .authenticate()
    .then(() => {
      fastify.log.info('Connection has been established successfully.')
    })
    .catch((err) => {
      fastify.log.info('Unable to connect to the database:', err)
    })

  fastify.decorate('sequelize', sequelize)
  next()
}

export default fastifyPlugin(sequelizeDB)

