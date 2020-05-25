const bcrypt = require('bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        password: bcrypt.hashSync(
          'Test123',
          bcrypt.genSaltSync(8)
        ),
        isActive: true,
        company: 'Alphabet',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};