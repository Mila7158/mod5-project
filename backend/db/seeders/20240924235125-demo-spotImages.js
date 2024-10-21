// backend/db/seeders/20240924235125-demo-spotImages
"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "/1/1.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "/1/1.1.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/1/1.2.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/2/2.1.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/1/1.3.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2/2.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "/2/2.1.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2/2.2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/1/1.1.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2/2.3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3/3.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "/1/1.1.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/1/1.2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3/3.3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/2/2.3.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/4/4.1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "/4/4.2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/1/1.4.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/2/2.4.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/1/1.1.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/8.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "/3/3.4.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/1/1.1.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/1/1.4.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/1/1.3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/7.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "/2/2.2.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/2/2.3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/2/2.4.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/2/2.1.jpg",
          preview: false,
        },
      ],
      options
    );
  },
  // async down(queryInterface, Sequelize) {
  //   options.tableName = "SpotImages";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },

  // //! TESTING BELOW
  // async down(queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete("SpotImages", null, options);
  // },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
