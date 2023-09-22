"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.createTable = void 0;
const postgress_1 = require("../Models/postgress");
const bcrypt_1 = __importDefault(require("bcrypt"));
//Реализуйте систему регистрации и аутентификации пользователей.
//Пользователи должны иметь уникальные идентификаторы, их личные данные (имя, фамилия, электронная почта, пароль и т. д.) должны храниться в SQL базе данных.
//Профили пользователей:
const SALT_ROUNDS = 10;
async function createTable() {
    try {
        await postgress_1.client.query(`CREATE TABLE IF NOT EXISTS facelessbook.users (
                                        ID serial4 NOT NULL,
                                        first_name varchar(10),
                                        last_name varchar(20),
                                        email varchar(30),
                                        login varchar (10),
                                        password varchar(100),
                                        PRIMARY KEY (ID)  )`);
    }
    catch (err) {
        throw new Error(`error database ${err.message}`);
    }
}
exports.createTable = createTable;
async function getUsers() {
    try {
        const users = await postgress_1.client.query(`SELECT * FROM facelessbook.users `);
        return users.rows;
    }
    catch (err) {
        throw new Error(`error database ${err.message}`);
    }
}
async function createUser({ name, lastName, email, login, password }) {
    const users = await getUsers();
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const loginExist = users.find((item) => item.login === login);
    const emailExist = users.find((item) => item.email === email);
    let message = "";
    try {
        if (!loginExist && !emailExist) {
            await postgress_1.client.query(`INSERT INTO facelessbook.users (first_name,last_name,email,login,password) VALUES ('${name}','${lastName}', '${email}', '${login}', '${hashedPassword}')`);
            message = "registration successful";
        }
        if (loginExist) {
            message = "this login is already in use. create a new login.";
        }
        if (emailExist) {
            message += "this email is already in use";
        }
        return message;
    }
    catch (err) {
        throw new Error(`error database ${err.message}`);
    }
}
exports.createUser = createUser;
