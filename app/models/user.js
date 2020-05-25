'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    company: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};