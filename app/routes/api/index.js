import oas from 'fastify-swagger'
const apiRoutes = async (app) => {
  app.register(oas, require('../docs'))
  app.register(require('./users'), { prefix: '/users' })
}

module.exports = apiRoutes
