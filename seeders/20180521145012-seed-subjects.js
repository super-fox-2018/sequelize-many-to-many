'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('subjects', [
      { subjectName: 'Kimia' },
      { subjectName: 'Fisika' },
      { subjectName: 'Matematika' },
      { subjectName: 'Biologi' },
      { subjectName: 'Ekonomi' },
      { subjectName: 'Sosiologi' },
      { subjectName: 'Sejarah' },
    ], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};
