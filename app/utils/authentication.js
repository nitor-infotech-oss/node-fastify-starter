// src/usingDB/controllers/Helper.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config/app'

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword (hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword)
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail (email) {
    return /\S+@\S+\.\S+/.test(email)
  },
}

export default Helper
