import fastifyPlugin from 'fastify-plugin'

function Between(server, opts, next) {
  server.decorate('between', (req) => {
    if (req.query.fromDate && req.query.endDate) {
      req.fromDate = req.query.fromDate
      req.endDate = req.query.endDate
      next()
    }
  })
  next()
}

export default fastifyPlugin(Between)
