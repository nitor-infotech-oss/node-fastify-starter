import fastifyPlugin from 'fastify-plugin'
import fastifyIO from 'fastify-socket.io'
import crypto from 'crypto'
import redis from 'socket.io-redis'

const env = process.env.NODE_ENV

function socketConnection(fastify, options, next) {
  const serverName = crypto.randomBytes(3).toString('hex')
  fastify.register(fastifyIO, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
  })

  fastify.ready((err) => {
    if (err) throw err
    if (env === 'production') {
      // Add redis host and port
      fastify.io.adapter(redis({ host: 'irad_resistance', port: 6379 }))
      fastify.log.info('Added redis adapter to socket')
    }
    fastify.io.on('connect', (socket) => {
      fastify.log.info('Socket connected:' + socket.id)
      fastify.log.info('client id: ' + socket.client.id)
      fastify.log.info('client id: ' + socket.client.conn.remoteAddress)
    })
    fastify.io.on('connection', (test) => {
      fastify.log.info('connected')
      fastify.log.info('client id: ' + test.client.conn.remoteAddress)
    })

    fastify.io.on('update', (data) => {
      fastify.log.info('data in update: ' + data)
    })

    fastify.io.on('connect_error', (err) => {
      fastify.log.info('connect error: ' + err)
    })
    fastify.io.on('connect_failed', (err) => {
      fastify.log.info('connect_failed: ' + err)
    })
    fastify.io.on('disconnect', (err) => {
      fastify.log.info('disconnect: ' + err)
    })
  })

  fastify.decorate('emitProgress', (data) => {
    fastify.log.info('SOCKET_EVENT: Event emitted' + data)
    fastify.log.info(
      '********SOCKET_EVENT********: fastify.io.engine.clientsCount: ' +
        fastify.io.engine.clientsCount
    )
    fastify.log.info(
      '********SOCKET_EVENT********: fastify.io.of("/").sockets.size: ' +
        fastify.io.of('/').sockets.size
    )
    fastify.log.info(
      '*********SOCKET_EVENT********: Object.keys(fastify.io.engine.clients): ' +
        Object.keys(fastify.io.engine.clients)
    )
    // This is an example of emitting "process" message along with payload.
    // Change the message key and payload as per use
    fastify.io.sockets.emit('progress', {
      uniqueProcessId: '37372723d7d27d7d',
      fileName: 'Example.CSV',
      percentage: 100,
      serverName
    })
  })
  next()
}

export default fastifyPlugin(socketConnection)
