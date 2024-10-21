// backend/db/models/booking.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
        as: "Spot",
      });

      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      validate: {
        datesAreValid() {
          if (this.startDate >= this.endDate) {
            throw new Error("startDate must be before endDate");
          }
        },
      },
    }
  );
  return Booking;
};
