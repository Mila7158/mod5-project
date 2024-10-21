// backend/db/seeders/20240925011629-demo-reviews
"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          review: "Great place to stay!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 2,
          review: "Had a decent experience.",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 3,
          review: "Absolutely loved it!",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review: "Not worth the price.",
          stars: 2,
        },
        {
          spotId: 3,
          userId: 2,
          review: "Best stay ever! Highly recommend.",
          stars: 5,
        },
      ],
      options
    );
  },

  // async down(queryInterface, Sequelize) {
  //   options.tableName = "Reviews";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
