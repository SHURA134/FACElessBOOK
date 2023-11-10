"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesRouter = void 0;
const articlesController_1 = require("../Controllers/articlesController");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
exports.articlesRouter = (0, express_1.Router)();
exports.articlesRouter.get("/getArticles", async (request, response) => {
    const login = request.query.login;
    response.send(await (0, articlesController_1.getArticles)(login));
});
exports.articlesRouter.post("/createArticle", (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('title').isString(), (0, express_validator_1.body)('content').isString(), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, title, content } = request.body;
    response.send(await (0, articlesController_1.articleCreate)(login, title, content));
});
exports.articlesRouter.delete("/deleteArticle", (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('title').isString(), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, title } = request.body;
    response.send(await (0, articlesController_1.deleteArticle)(login, title));
});
exports.articlesRouter.post("/updateArticle", (0, express_validator_1.body)('login').isString(), (0, express_validator_1.body)('title').isString(), (0, express_validator_1.body)('content').isString(), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    const { login, title, content } = request.body;
    response.send(await (0, articlesController_1.updateArticle)(login, title, content));
});
