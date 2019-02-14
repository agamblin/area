"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../keys");
const Sequelize = require("sequelize");
exports.default = new Sequelize(keys_1.sqlDb, keys_1.sqlUser, keys_1.sqlPassword, {
    dialect: 'mysql',
    host: keys_1.sqlHost,
    port: keys_1.sqlPort
});
//# sourceMappingURL=database.js.map