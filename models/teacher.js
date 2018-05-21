'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:'harus berbentuk email'
        },
        async isuniqueEmail(email){
          await Teacher.find({where:{email:email}})
          .then(emailFound=>{
            if(emailFound) throw new Error('email tidak unik!!')
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {
  });
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};