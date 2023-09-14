"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const usersController_1 = require("../Controllers/usersController");
const express_1 = require("express");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/", async (request, response) => {
    await (0, usersController_1.createTable)();
});
exports.usersRouter.post("/registration", async (request, response) => {
    const { name, lastName, login, password, email } = request.body;
    response.send(await (0, usersController_1.createUser)({ name, lastName, email, login, password }));
});
