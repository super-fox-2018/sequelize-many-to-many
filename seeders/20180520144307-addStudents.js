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
    return queryInterface.bulkInsert('Students', [{
        first_name: 'Dora',
        last_name: 'Pantau',
        email: 'johnpantau@mail.com'
      },{
        first_name: 'Flora',
        last_name: 'Floris',
        email: 'doriFloris@mail.com'
      },{
        first_name: 'Florence',
        last_name: 'Vona',
        email: 'florence@mail.com'
      },{
        first_name: 'Broi',
        last_name: 'Pantau',
        email: 'ruypantau@mail.com'
      },{
        first_name: 'Mora',
        last_name: 'Pantau',
        email: 'moriopantau@mail.com'  
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
