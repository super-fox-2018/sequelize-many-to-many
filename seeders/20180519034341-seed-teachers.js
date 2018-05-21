'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [{
        firstName: 'Bruce',
        lastName: 'Banner',
        email: 'hulk@mschool.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'ironman@mschool.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        firstName: 'Thor',
        lastName: 'Odinson',
        email: 'mjolnir@mschool.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        firstName: 'Phil',
        lastName: 'Coulson',
        email: 'agent@mschool.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
