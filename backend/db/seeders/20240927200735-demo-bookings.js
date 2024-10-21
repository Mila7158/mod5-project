// backend/db/seeders/20240927200735-demo-bookings
const { Booking } = require("../models");
("use strict");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2024-10-01T14:00:00Z"),
          endDate: new Date("2024-10-05T11:00:00Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2024-10-10T14:00:00Z"),
          endDate: new Date("2024-10-15T11:00:00Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date("2024-10-20T14:00:00Z"),
          endDate: new Date("2024-10-25T11:00:00Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2024-11-01T14:00:00Z"),
          endDate: new Date("2024-11-05T11:00:00Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2024-11-10T14:00:00Z"),
          endDate: new Date("2024-11-15T11:00:00Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
