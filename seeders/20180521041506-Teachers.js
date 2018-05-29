'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let teacherData = fs.readFileSync('teacher.csv','utf8').split('\n')
    let teacherArray = []
    teacherData.forEach(teacher=>{
      teacher = teacher.split(',')
      let teacherObj = {
        first_name:teacher[0],
        last_name:teacher[1],
        email:teacher[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      teacherArray.push(teacherObj)
    })

    return queryInterface.bulkInsert('Teachers', teacherArray, {});
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
