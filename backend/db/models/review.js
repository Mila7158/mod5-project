// backend/db/models/review.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        as: "Spot",
      });

      Review.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });

      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        as: "ReviewImages",
      });
    }
  }
  Review.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE"
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
