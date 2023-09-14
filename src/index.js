"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var usersRouter_1 = require("./Routers/usersRouter");
exports.app = (0, express_1.default)();
var port = 3000;
//@ts-ignore
exports.app.use(express_1.default.json());
exports.app.use("/users", usersRouter_1.usersRouter);
exports.app.listen(port, function () {
    console.log("Application has successfully started on port ".concat(port));
});
