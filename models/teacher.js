'use strict';

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect!'
        },
        async findEmail(email){
          const teacher = await Teacher.findOne({ where : { email } });
          if (teacher && teacher.id !== +this.id){
              throw new Error('Email Already Exist!');
          }
        }
      }
    },
    subjectId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject, {
      foreignKey: {
        name: 'subjectId'
      }
    });
  };

  Teacher.hook('beforeCreate', (teacher, options)=>{
    if (teacher.lastName === 'Cena'){
      teacher.firstName += ' ' + 'John';
    }
    teacher.firstName.trim();
    teacher.lastName.trim();
  });

  Teacher.hook('beforeBulkUpdate', (teacher, options)=>{
    console.log('before update')
    console.log(teacher);
    if (!teacher.subjectId){
      console.log('masuk subjectId')
      teacher.subjectId = 1;
    }
  })
  return Teacher;
};