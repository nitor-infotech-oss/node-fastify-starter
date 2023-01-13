import fastifyPlugin from 'fastify-plugin'

function DateDifference(server, opts, next) {
  server.decorate(
    'dateDifference',
    ({ todaysDate, userCreateDate }) => (todaysDate - userCreateDate) / (1000 * 3600 * 24)
  )
  next()
}

export default fastifyPlugin(DateDifference)
