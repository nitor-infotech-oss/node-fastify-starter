import fastifyPlugin from 'fastify-plugin'

function checkForRole(server, opts, next) {
  server.decorate('checkForRole', async (req, res, roles) => {
    // Check if passed role is present in the token of incoming request
    let validRoles = []
    if (req.user && req.user.role && req.user.role.length > 0) {
      validRoles = req.user.role.filter((role) => roles.includes(role.name))
    }
    if (validRoles.length > 0) {
      next()
    } else {
      res.code(401).send('Unauthorized')
    }
  })
  next()
}

export default fastifyPlugin(checkForRole)
