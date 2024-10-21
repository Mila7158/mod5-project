// backend/db/models/spotimage.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
        foreignKey: "spotId",
        // as: "spot",
      });
    }
  }
  SpotImage.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE"
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        isURL: true,
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SpotImage",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return SpotImage;
};
