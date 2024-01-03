'use strict';

const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');
const doctors = JSON.parse(fs.readFileSync('./data/doctors.json'))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    for (let i = 0; i < doctors.length; i++) {
      const doctorData = doctors[i]

      const users = await queryInterface.bulkInsert('Users', [{
        username: doctorData.username,
        password: hashPassword(doctorData.password),
        role: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })

      await queryInterface.bulkInsert('Doctors', [{
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        speciality: doctorData.speciality,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Doctors', {}, {})
  }
};
