"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Homes",
      [
        {
          homeName: "Theo's Home",
          ownerId: 1,
          imgUrl: "https://picsum.photos/id/3/200/300",
        },
        {
          homeName: "Demo's Home",
          ownerId: 2,
          imgUrl: "https://picsum.photos/id/2/200/300",
        },
        {
          homeName: "Demo's 2nd Home",
          ownerId: 3,
          imgUrl: "https://picsum.photos/id/1/200/300",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Homes",
      {
        imgUrl: { [Op.in]: ["https://picsum.photos/200"] },
      },
      {}
    );
  },
};
