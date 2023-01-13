const { Transaction } = require('sequelize')
import fastifyPlugin from 'fastify-plugin'

function TransactionManager(server, opts, next) {
  server.decorate('withTransaction', async (action) => {
    return await server.sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
      },
      (t) => action(t)
    )
  })
  next()
}

export default fastifyPlugin(TransactionManager)
