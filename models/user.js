'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part ofDataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Booking,{
       // onDelete: 'CASCADE',
       // onUpdate: 'CASCADE'
     // }) 
    }
  }
  User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type:DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type:DataTypes.STRING,
        allowNull: false
      },
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type:DataTypes.STRING,
        allowNull: false
      },
      password: {
        type:DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type:DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATE
      }
  }, {
  sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  });
  return User;
};