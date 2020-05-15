import userService from '../../../services/users/userService'
import {getAllUsers, getOneUser} from './type'

const userRoutes = async (app) => {
  app.addHook('preHandler', (request, reply, done) => {
    app.authenticate(request, reply)
    done()
  })
  app.get('/', { schema: getAllUsers }, async (request, reply) => {
    app.log.info('request.query', request.query)
    const users = await userService.getAll()
    return users
  })

  app.get('/:id', { schema: getOneUser }, async (request, reply) => {
    app.log.info('request.query', request.query)
    const user = await userService.getUser(request.params.id)
    return user
  })
}

module.exports = userRoutes
