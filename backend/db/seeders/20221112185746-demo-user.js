"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "demo",
          profileImageUrl: "https://picsum.photos/id/112/200/300",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "demo1@user.io",
          username: "demo1",
          profileImageUrl: "https://picsum.photos/id/41/200/300",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "demo2@user.io",
          username: "demo2",
          profileImageUrl: "https://picsum.photos/id/51/200/300",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
