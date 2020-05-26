import { LoginUser } from './type'
import UserController from '../../../../controllers/user'

const authenticationRoutes = async (app) => {
  app.post('/login', { schema: LoginUser }, UserController.login)
}

module.exports = authenticationRoutes
