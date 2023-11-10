"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersRouters_1 = require("./Routers/usersRouters");
const friendsRouter_1 = require("./Routers/friendsRouter");
const articlesRouter_1 = require("./Routers/articlesRouter");
const express_session_1 = __importDefault(require("express-session"));
exports.app = (0, express_1.default)();
const port = 3000;
//@ts-ignore
exports.app.use(express_1.default.json());
//@ts-ignore
exports.app.use((0, express_session_1.default)({
    secret: `secret`,
    name: `session`
}));
exports.app.use("/users", usersRouters_1.usersRouter);
exports.app.use("/friends", friendsRouter_1.friendsRouter);
exports.app.use("/articles", articlesRouter_1.articlesRouter);
exports.app.listen(port, () => {
    console.log(`Application has successfully started on port ${port}`);
});
