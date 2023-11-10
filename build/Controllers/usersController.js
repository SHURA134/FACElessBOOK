"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const startDb_1 = require("../startDb");
const SALT_ROUNDS = 3;
async function createUser(login, password, name, last_name, age, avatar_link) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const loginExist = await usersCollection.findOne({ login });
        if (loginExist) {
            console.log("return false because user is already exist ");
            return false;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = {
            login,
            password: hashedPassword,
            name,
            last_name,
            age,
            avatar_link,
            friends: [],
            friends_request: [],
            articles: []
        };
        await usersCollection.insertOne(newUser);
        return true;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.createUser = createUser;
async function logInUser(login, password) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const loginExist = await usersCollection.findOne({ login });
        const passwordExist = await bcrypt_1.default.compare(password, loginExist.password);
        if (!loginExist || !passwordExist) {
            console.log("This login was not found. try again or register");
            return false;
        }
        return true;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.logInUser = logInUser;
