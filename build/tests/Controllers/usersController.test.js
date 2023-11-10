"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const index_1 = require("../../index");
(0, globals_1.describe)("userController", () => {
    (0, globals_1.it)('Should correctly return users from external api', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post("/users/registration")
            .send({ login: "ustimk1", password: 123, name: "Jenya", last_name: "Ustimov", age: "26", avatar_link: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTlFppQFm4VCK-UlCGwBXMWBW1BSM0v_KDxVwXZgEO-4slA_Bq23-4OUg_Lg2ONXc2D" });
        (0, globals_1.expect)(response).toEqual(true);
    });
});
