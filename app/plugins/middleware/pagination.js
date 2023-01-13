import fastifyPlugin from 'fastify-plugin'

function Paginate(server, opts, next) {
  server.decorate('pagination', (req) => {
    const { page, pageSize } = req.query
    if (page && pageSize) {
      const offset = page * pageSize
      const limit = pageSize
      req.paginationOptions = { offset, limit }
      next()
    }
  })
  next()
}

export default fastifyPlugin(Paginate)
