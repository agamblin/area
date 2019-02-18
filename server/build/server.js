"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const database_1 = require("./utils/database");
const authRoutes_1 = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes_1.default);
app.use((error, req, res, next) => {
    req;
    next;
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});
database_1.default.sync().then(() => {
    app.listen(8080, () => 'listening on port 8080');
});
//# sourceMappingURL=server.js.map