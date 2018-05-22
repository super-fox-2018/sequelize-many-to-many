'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  }, { 
    tableName: 'teachers',
    hooks: {
      beforeCreate: (teacher, options) => {
        const keys = Object.keys(teacher.dataValues);
        keys.slice(1,3).forEach(key => {
          console.log(key);
          teacher[key] = teacher[key].trim();
        });
      }
    }
  });
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
    });
  };

  Teacher.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  return Teacher;
};