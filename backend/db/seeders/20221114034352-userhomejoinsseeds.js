"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "UserHomeJoins",
      [
        {
          userId: 1,
          homeId: 1,
        },
        {
          userId: 1,
          homeId: 2,
        },
        {
          userId: 1,
          homeId: 3,
        },
        {
          userId: 2,
          homeId: 1,
        },
        {
          userId: 2,
          homeId: 2,
        },
        {
          userId: 3,
          homeId: 1,
        },
        {
          userId: 3,
          homeId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "UserHomeJoins",
      {
        userId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
