'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {

    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    featured: DataTypes.BOOLEAN,
    published: DataTypes.DATE
  }, {});
  Blog.associate = function (models) {
    // associations can be defined here
    models.Blog.belongsTo(models.Author, {
     as: "author",
      //foreignKey: "authorId"
   })
  };
  return Blog;
};