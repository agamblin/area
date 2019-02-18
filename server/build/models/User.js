"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const Sequelize = require("sequelize");
const User = database_1.default.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
exports.default = User;
//# sourceMappingURL=User.js.map