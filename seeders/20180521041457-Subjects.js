'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let subjectData = fs.readFileSync('subject.csv','utf8').split('\n')
    let subjectArray = []
    subjectData.forEach(subject=>{
      subject = subject.split(',')
      let subjectObj = {
        subject_name:subject[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      subjectArray.push(subjectObj)
    })

    return queryInterface.bulkInsert('Subjects', subjectArray, {});
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
