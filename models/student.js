'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate:(student,options)=>{
        student.first_name += ' sponsored by Aqua'
      },
      afterCreate:(student,options)=>{
        let studentObj ={
          last_name: student.last_name + 'HAHAHAAHA'
        }
        Student.update(studentObj,{where:{id:student.id}})
      }
    }
  });
  Student.associate = function(models) {
    Student.hasMany(models.StudentsSubject)
  };
  return Student;
};