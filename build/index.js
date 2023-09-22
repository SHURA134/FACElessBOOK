"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersRouter_1 = require("./Routers/usersRouter");
const profilesRuoters_1 = require("./Routers/profilesRuoters");
exports.app = (0, express_1.default)();
const port = 3000;
//@ts-ignore
exports.app.use(express_1.default.json());
exports.app.use("/users", usersRouter_1.usersRouter);
exports.app.use("/profiles", profilesRuoters_1.profileRouter);
exports.app.listen(port, () => {
    console.log(`Application has successfully started on port ${port}`);
});
