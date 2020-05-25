import jwt from 'jsonwebtoken'
import fastifyPlugin from 'fastify-plugin'
import config from '../../../config/app'

function verifyToken (server, opts, next) {
  server.decorate('authenticate', (req, res) => {
    //get the token from the header if present
    const token = req.headers
      ? req.headers['x-access-token'] || req.headers['authorization']
      : null

    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, config.get('secret_key'))
      req.user = decoded
      next()
    } catch (ex) {
      //if invalid token
      res.code(400).send('Unauthorized')
    }
  })
  next()
}

export default fastifyPlugin(verifyToken)
