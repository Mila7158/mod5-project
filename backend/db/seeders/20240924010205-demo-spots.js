// backend/db/seeders/20240924010205-demo-spots
"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Mediterranean Villa with Vineyard Views",
        description: "Surrounded by olive groves and vineyards, this villa offers a taste of the Mediterranean lifestyle.",
        price: 123.0,

      },
      {
        ownerId: 2,
        address: "456 Serenity Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Mountain Chalet with Hot Tub",
        description:
          "Perched on a hilltop, this chalet offers panoramic views of snow-capped peaks.",
        price: 150.0,

      },
      {
        ownerId: 3,
        address: "789 Woodland Ave",
        city: "Santa Cruz",
        state: "California",
        country: "United States of America",
        lat: 37.3328,
        lng: -74.006,
        name: "Historic Cottage with Garden Charm",
        description:
          "A charming cottage built in the 1800s, this home blends vintage architecture with modern comforts.",
        price: 200.0,

      },
      {
        ownerId: 1,
        address: "152 New Yourk street",
        city: "Ventura",
        state: "California",
        country: "United States of America",
        lat: 37.3328,
        lng: -74.006,
        name: "Beachfront Villa with Private Pool",
        description:
          "This luxurious beachfront villa offers direct access to white sand and crystal-clear waters.",
        price: 280.0,

      },
      {
        ownerId: 2,
        address: "121 Orange Street",
        city: "Sherman Oaks",
        state: "California",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Mountain Chalet with Hot Tub",
        description:
          "Perched on a hilltop, this chalet offers panoramic views of snow-capped peaks. ",
        price: 150.0,

      },
      {
        ownerId: 3,
        address: "190 Lemon Street",
        city: "Thousant Oaks",
        state: "California",
        country: "United States of America",
        lat: 37.3328,
        lng: -74.006,
        name: "Historic Cottage with Garden Charm",
        description:
          "A charming cottage built in the 1800s, this home blends vintage architecture with modern comforts.",
        price: 200.0,

      },
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {}); 
  },
};
