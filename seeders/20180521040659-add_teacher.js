'use strict';
// const fs = require('fs');
// const teacherString = fs.readFileSync(__dirname + '/../teacher.csv', 'utf8');
// const arrTeacher = teacherString.split('\n');

// let teachers = []
// for (let i = 0; i < arrTeacher.length; i++) {
//   if (arrTeacher[i].length !==0){
//     const teacher = arrTeacher[i].split(',');
//     teachers.push({
//       firstName: teacher[0],
//       lastName: teacher[1],
//       email : teacher[2]
//     })
//   }
// }
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
  //  return queryInterface.bulkInsert('Teachers', teachers, {});
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
