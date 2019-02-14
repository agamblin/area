"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const database_1 = require("./utils/database");
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    req;
    res.send('Hi');
});
database_1.default.sync().then(() => {
    app.listen(8080, () => 'listening on port 8080');
});
//# sourceMappingURL=server.js.map