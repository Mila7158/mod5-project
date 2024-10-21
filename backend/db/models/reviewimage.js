// backend/db/models/reviewimage.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: "reviewId",
        as: "Review",
      });
    }
  }
  ReviewImage.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING,
        isURL: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
    }
  );
  return ReviewImage;
};
