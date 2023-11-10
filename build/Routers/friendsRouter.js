"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const friendsController_1 = require("../Controllers/friendsController");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const midlewareSession_1 = require("../midlewares/midlewareSession");
exports.friendsRouter = (0, express_1.Router)();
exports.friendsRouter.post('/showFriends', (0, express_validator_1.body)('login').isString(), midlewareSession_1.authMiddleware, async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login } = request.body;
    response.send(await (0, friendsController_1.getFriends)(login));
});
exports.friendsRouter.post('/showFriendsRequest', (0, express_validator_1.body)('login').isString(), midlewareSession_1.authMiddleware, async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login } = request.body;
    response.send(await (0, friendsController_1.getFriendsRequest)(login));
});
exports.friendsRouter.post('/addFriends', (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('friendLogin').isString(), midlewareSession_1.authMiddleware, async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, friendLogin } = request.body;
    response.send(await (0, friendsController_1.addFriend)(login, friendLogin));
});
exports.friendsRouter.post('/acceptInFriends', (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('friendLogin').isString(), (0, express_validator_1.body)('friendId').isNumeric(), midlewareSession_1.authMiddleware, async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, friendId, answer } = request.body;
    response.send(await (0, friendsController_1.acceptRequests)(login, friendId, answer));
});
exports.friendsRouter.post('/deleteFriends', (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('friendLogin').isString(), midlewareSession_1.authMiddleware, async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, friendId } = request.body;
    response.send(await (0, friendsController_1.deleteFriend)(login, friendId));
});
