"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, currentRoomId, profileImageUrl } = this; // context will be the User instance
      return { id, username, email, currentRoomId, profileImageUrl };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ username, password }) {
      //const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          username,
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({ email, username, password, profileImageUrl }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        email,
        username,
        hashedPassword,
        profileImageUrl,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Home, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Anagram, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Home, {
        through: "UserHomeJoins",
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profileImageUrl: {
        type: DataTypes.STRING,
      },
      currentRoomId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
