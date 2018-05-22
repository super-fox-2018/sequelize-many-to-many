'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
      firstName: 'Setia',
      lastName: 'Anggraeni',
      email: 'setia@sekolah.id',
      subjectId : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Daniel',
      lastName: 'Nino',
      email: 'daniel@sekolah.id',
      subjectId : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Asyera',
      lastName: 'Aulia',
      email: 'asyera@sekolah.id',
      subjectId : 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Jessica',
      lastName: 'Aurora',
      email: 'jessica@sekolah.id',
      subjectId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
