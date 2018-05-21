'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Subjects', [{
        subjectName: 'Chemistry',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subjectName: 'Physics',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subjectName: 'P.E.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subjectName: 'Economics',
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
