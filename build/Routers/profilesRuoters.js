"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const profilesController_1 = require("../Controllers/profilesController");
const express_1 = require("express");
exports.profileRouter = (0, express_1.Router)();
exports.profileRouter.post('/registration', async (request, response) => {
    const { login, password, name, last_name, age, avatar_link } = request.body;
    const isProfileCreated = await (0, profilesController_1.createProfile)(login, password, name, last_name, age, avatar_link);
    isProfileCreated
        ? response.send(`${login} , your registration is successful`)
        : response.status(401).send("this login is already registrated");
});
