"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      likedBy: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("likes");
  },
};
