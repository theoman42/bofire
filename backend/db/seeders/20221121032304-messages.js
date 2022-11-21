"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Messages",
      [
        {
          userId: 1,
          roomId: 1,
          dmId: null,
          messageBody: "hey",
        },
        {
          userId: 1,
          roomId: 1,
          dmId: null,
          messageBody: "What's up",
        },
        {
          userId: 1,
          roomId: 1,
          dmId: null,
          messageBody: "Nothing Much",
        },
        {
          userId: 1,
          roomId: 1,
          dmId: null,
          messageBody: "So Lonely here",
        },
        {
          userId: 1,
          roomId: 1,
          dmId: null,
          messageBody: "yeah",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Messages",
      {
        roomId: { [Op.in]: [1] },
      },
      {}
    );
  },
};
