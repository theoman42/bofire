"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Home, {
        foreignKey: "homeId",
        as: "rooms",
      });
      Room.hasMany(models.Message, {
        foreignKey: "roomId",
        onDelete: "CASCADE",
      });
    }
  }
  Room.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roomName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      homeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      caption: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
