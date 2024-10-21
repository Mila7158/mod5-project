// backend/db/migrations/20240925011302-create-review

"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Reviews",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          references: {
            model: "Spots",
            key: "id",
          },
          onDelete: "CASCADE"
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        review: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stars: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
          check: {
            args: [1, 5],
            msg: "Stars must be between 1 and 5",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.dropTable(options);
  },
  // //! TESTING BELOW
  // async down(queryInterface, Sequelize) {
  //   await queryInterface.dropTable("Reviews", options);
  // },
};
