'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
    queryInterface.addColumn('Teachers', 'subject', {type: Sequelize.STRING, defaultValue: 'unassigned'}),
    queryInterface.addColumn('Teachers', 'subjectId', {type: Sequelize.INTEGER})
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
    queryInterface.removeColumn('Teachers', 'subject'),
    queryInterface.removeColumn('Teachers', 'subjectId')
    ];
  }
};
