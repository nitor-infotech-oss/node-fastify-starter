export default (fastify, _, next) => {
  fastify.get('/', (_, reply) => {
    reply.send({ Welcome: 'PTOYNet HealthNet' })
  })
  next()
}
