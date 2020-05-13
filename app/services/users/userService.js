import db from '../../models/index';

const User = db.User;

const userService = {
  async getAll () {
    return await User.findAll();
  },
  async getUser (id) {
    return await User.findOne({where: {id: id}});
  }
}

export default userService
