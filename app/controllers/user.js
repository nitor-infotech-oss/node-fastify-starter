import Responder from '../../server/responder'
import userService from '../services/users/userService'
import Helper from '../utils/authentication'

export default class UserController {
  static async getAll (req, res) {
    const userList = await userService.getAll()
    Responder.success(res, userList)
  }

  static async getById (req, res) {
    const user = await userService.getUser(req.params.id)
    Responder.success(res, user)
  }

  static async create (req, res) {
    const user = await userService.createUser(req.body)
    Responder.created(res, user)
  }

  static async login (req, res) {
    const user = await userService.loginUser(req.body)
    if (user) {
      let access_token = Helper.generateToken(user)
      Responder.success(res,{
        user: user,
        access_token: access_token
      })
    } else {
        Responder.operationFailed(res,'Login Failed.')
    }
  }
}
