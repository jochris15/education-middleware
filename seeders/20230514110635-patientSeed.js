'use strict';

const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');
const patients = JSON.parse(fs.readFileSync('./data/patients.json')).map((patient) => {
  patient.createdAt = new Date()
  patient.updatedAt = new Date()
  return patient
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < patients.length; i++) {
      const patientData = patients[i]

      const users = await queryInterface.bulkInsert('Users', [{
        username: patientData.username,
        password: hashPassword(patientData.password),
        role: 'Patient',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })

      await queryInterface.bulkInsert('Patients', [{
        fullname: patientData.fullname,
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

    await queryInterface.bulkDelete('Patients', {}, {})
  }
};
