// backend/db/seeders/20240924235143-demo-reviewImages
"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
        {
          reviewId: 2,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
        {
          reviewId: 3,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
        {
          reviewId: 4,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
        {
          reviewId: 5,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
        {
          reviewId: 6,
          url: "https://cdn.prod.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
        },
      ],
      options
    );
  },

  // async down(queryInterface, Sequelize) {
  //   options.tableName = "ReviewImages";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },
  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
