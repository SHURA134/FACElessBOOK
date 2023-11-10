"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const usersController_1 = require("../Controllers/usersController");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.post('/registration', (0, express_validator_1.body)('login', "1").isString(), (0, express_validator_1.body)('password', "2").isLength({
    min: 3
}), (0, express_validator_1.body)('name', "3").isString(), (0, express_validator_1.body)('last_name', "4").isString(), (0, express_validator_1.body)('age', "5").isNumeric(), (0, express_validator_1.body)('avatar_link', "6").isString(), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, password, name, last_name, age, avatar_link } = request.body;
    const isProfileCreated = await (0, usersController_1.createUser)(login, password, name, last_name, age, avatar_link);
    isProfileCreated
        ? response.send(`${login} , your registration is successful`)
        : response.status(401).send("this login is already registrated");
});
exports.usersRouter.post('/authorization', (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('password').isLength({
    min: 3
}), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, password } = request.body;
    //@ts-ignore
    request.session[login] = await (0, usersController_1.logInUser)(login, password);
    //@ts-ignore
    request.session[login]
        ? response.send(`${login} , your authorization is successful`)
        : response.status(401).send("This login was not found. try again or register");
});
exports.usersRouter.post('/logOut', (0, express_validator_1.body)('login').isString(), async (request, response) => {
    const { login } = request.body;
    //@ts-ignore
    request.session[login] = undefined;
    return response.status(200).send('logout is successful');
});
