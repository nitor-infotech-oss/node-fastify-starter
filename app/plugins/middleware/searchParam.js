import fastifyPlugin from 'fastify-plugin'

function searchParam(server, opts, next) {
  server.decorate('searchParam', (req) => {
    const { searchParam } = req.query
    if (searchParam) {
      req.searchParam = searchParam
      next()
    }
  })
  next()
}

export default fastifyPlugin(searchParam)
