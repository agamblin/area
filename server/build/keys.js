"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlHost = process.env.RDS_HOSTNAME;
exports.sqlUser = process.env.RDS_USERNAME;
exports.sqlPassword = process.env.RDS_PASSWORD;
exports.sqlDb = process.env.RDS_DB_NAME;
exports.sqlPort = parseInt(process.env.RDS_PORT);
//# sourceMappingURL=keys.js.map