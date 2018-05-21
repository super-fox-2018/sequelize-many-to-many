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
          msg: 'Your email format is wrong'
        },
        isEmailUnique: function(email, callback) {
          Teacher.findOne({where: {email}})
           .then(function(student) {
            if (student !== null) {
              callback('Email is used');
            } else {
              callback();
            }
          });
        }
      }
    },
    subject: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    models.Teacher.belongsTo(models.Subject, {foreignKey: 'subjectId'});
  };
  return Teacher;
};
