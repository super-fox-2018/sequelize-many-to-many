'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Teachers', [{
        first_name: 'John',
        last_name: 'Pantau',
        email: 'johnpantau@mail.com',
        SubjectId:1
      },{
        first_name: 'Dori',
        last_name: 'Floris',
        email: 'doriFloris@mail.com',
        SubjectId:2
      },{
        first_name: 'Florence',
        last_name: 'Vona',
        email: 'florence@mail.com',
        SubjectId:3
      },{  
        first_name: 'Ruy',
        last_name: 'Pantau',
        email: 'ruypantau@mail.com',
        SubjectId:3
      },{
        first_name: 'Morio',
        last_name: 'Pantau',
        email: 'moriopantau@mail.com',
        SubjectId:2  
      }], {});
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
