import jwt from 'jsonwebtoken'
import fastifyPlugin from 'fastify-plugin'
import config from '../../../config/app'
import Responder from '../../../server/responder'

function verifyToken(server, opts, next) {
  server.decorate('authenticate', async (req, res) => {
    //get the token from the header if present
    const token = req.headers
      ? req.headers['x-access-token'] || req.headers['authorization']
      : null
    //if no token found, return response (without going to the next middelware)
    if (!token) Responder.operationFailed(res,'Access denied. No token provided.')

    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, 'private-key')
      req.user = decoded
      next()
    } catch (ex) {
      //if invalid token
      res.send('Invalid token.',400)
    }
  })
  next()
}

export default fastifyPlugin(verifyToken)
