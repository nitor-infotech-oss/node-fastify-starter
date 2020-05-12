export default (fastify, _, next) => {
  fastify.get('/healthcheck', (_, reply) => {
    reply.send('OK', 200)
  })
  next()
}
