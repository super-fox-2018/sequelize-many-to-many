'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
   queryInterface.bulkInsert('teachers', [
      {
        firstName: 'Bambang',
        lastName: 'Suprapto',
        email: 'bambangsuprapto@sekolah.id',
        subjectId: 2,
      },{
        firstName: 'Rukmana',
        lastName: 'Fatmawati',
        email: 'rukmanafatmawati@sekolah.id',
        subjectId: 3,
      },{
        firstName: 'Butet',
        lastName: 'Naiborhu',
        email: 'butetnaiborhu@sekolah.id',
        subjectId: 1,
      },{
        firstName: 'Yulius',
        lastName: 'Prawiranegara',
        email: 'yuliusprawirenegara@sekolah.id',
        subjectId: 2,
      },
    ], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teachers', null, {});
  }
};
