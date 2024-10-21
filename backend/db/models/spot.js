// backend/db/models/spot.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "Owner",
      });

      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      // avgRating: {
      //   //! Option to DELETE this later once aggregate
      //   type: DataTypes.FLOAT,
      //   allowNull: true,
      // },
      // previewImage: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
