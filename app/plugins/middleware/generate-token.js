import jwt from 'jsonwebtoken'
import fastifyPlugin from 'fastify-plugin'
import config from '../../../config/app'

function Token (server, opts, next) {
  server.decorate('generateToken', (user) => {
    const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          permissions: user.permission
        },
        config.get('secret_key'),
        { expiresIn: '7d' }
      )
      return token
  })
  next()
}

export default fastifyPlugin(Token)
