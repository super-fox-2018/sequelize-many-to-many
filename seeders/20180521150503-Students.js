'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let studentData = fs.readFileSync('student.csv','utf8').split('\n')
    let studentArray = []
    studentData.forEach(student=>{
      student = student.split(',')
      let studentObj = {
        first_name:student[0],
        last_name:student[1],
        email:student[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      studentArray.push(studentObj)
    })

    return queryInterface.bulkInsert('Students', studentArray, {});
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
