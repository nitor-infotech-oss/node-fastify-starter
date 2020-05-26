import {getAllUsers, getOneUser, createOneUser} from './type'
import UserController from '../../../../controllers/user'

const userRoutes = async (app) => {
  app.addHook('preHandler', (request, reply, done) => {
    app.log.info('request.query', request.query)
    app.authenticate(request, reply)
    done()
  })
  app.get('/', { schema: getAllUsers },  UserController.getAll)

  app.get('/:id', { schema: getOneUser }, UserController.getById)

  app.post('/', {schema: createOneUser}, UserController.create)

}

module.exports = userRoutes
