'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: "CASCADE"
      })
    }
  }
  Nodes.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled"
    },
    html: DataTypes.TEXT,
    css: DataTypes.TEXT,
    js: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Nodes',
  });
  return Nodes;
};