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

      // Validate the session id or find the user.
      // If user is not present then session is not authenticated
      next()
    } catch (ex) {
      //if invalid token check the type of invalid token
      if (ex.name === 'TokenExpiredError') {
        const payload = jwt.decode(
          token.replace('Bearer ', ''),
          config.get('secret_key')
        )
        // Following condition can be changed as per the architecture
        if (
          payload &&
          (payload.module === 'forgotPassword' ||
            payload.module === 'createSignupUser')
        ) {
          res.code(400).send('This link has expired.')
        }
      }
      res.code(400).send('Unauthorized')
    }
  })
  next()
}

export default fastifyPlugin(verifyToken)
