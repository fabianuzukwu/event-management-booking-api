'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // Event.belongsTo(models.Category,{ 
        //   foreignKey: 'categoryId',
        //   as: 'category',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE'
        // })
 
        // Event.hasMany(models.Booking, {
        //   as: 'bookings',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE'
        // })
    }
  }
  Event.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        type: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      ticketPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
        model: 'Categories',
        key: 'id'  
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      availableTickets: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }, 
    }, { 
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true
 });
  return Event;
};