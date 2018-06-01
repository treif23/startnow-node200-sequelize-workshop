'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Author.associate = function (models) {
    // associations can be defined here
    Author.hasMany(models.Blog, {as: 'blogs'})
  };
  return Author;
};