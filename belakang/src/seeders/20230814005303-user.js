'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
    name: 'Admin',
    email: 'admin@mail.com',
    password: '$2a$12$LP7rPdRIgJYfxH3BKql3G.3yY6ThJuYxCsrDTTpaDuEcbMHBW/ESW', // passwrod admin = Password1!.
    roleId: 1,
    // shiftId: 1,
    baseSalary: 1000000,
    birthday: new Date(),
    join: new Date(),  
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    name: 'Employee',
    email: 'employee@mail.com',
    password: '$2a$12$LP7rPdRIgJYfxH3BKql3G.3yY6ThJuYxCsrDTTpaDuEcbMHBW/ESW', // passwrod admin = Password1!.
    roleId: 2,
    // shiftId: 2,
    baseSalary: 1000000,
    birthday: new Date(),
    join: new Date(),  
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
