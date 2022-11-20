"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Rooms",
      [
        {
          roomName: "Theo's Room",
          homeId: 1,
          caption: "Welcome to my homeroom!",
        },
        {
          roomName: "Demo's Home",
          homeId: 2,
          caption: "Welcome to my Kitchen!",
        },
        {
          roomName: "Demo's 2nd Home",
          homeId: 3,
          caption: "Welcome to my Living Room!",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Rooms",
      {
        homeId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
