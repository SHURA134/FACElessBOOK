"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.createTable = void 0;
var db_1 = require("../Models/db");
var bcrypt_1 = require("bcrypt");
//Реализуйте систему регистрации и аутентификации пользователей.
//Пользователи должны иметь уникальные идентификаторы, их личные данные (имя, фамилия, электронная почта, пароль и т. д.) должны храниться в SQL базе данных.
//Профили пользователей:
var SALT_ROUNDS = 10;
function createTable() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.client.query("CREATE TABLE IF NOT EXISTS facelessbook.users (\n                                        ID serial4 NOT NULL,\n                                        first_name varchar(10),\n                                        last_name varchar(20),\n                                        email varchar(30),\n                                        login varchar (10),\n                                        password varchar(100),\n                                        PRIMARY KEY (ID)  )")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("error database ".concat(err_1.message));
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTable = createTable;
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.client.query("SELECT * FROM facelessbook.users ")];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users.rows];
                case 2:
                    err_2 = _a.sent();
                    throw new Error("error database ".concat(err_2.message));
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createUser(_a) {
    var name = _a.name, lastName = _a.lastName, email = _a.email, login = _a.login, password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
        var users, hashedPassword, loginExist, emailExist, message, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getUsers()];
                case 1:
                    users = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
                case 2:
                    hashedPassword = _b.sent();
                    loginExist = users.find(function (item) { return item.login === login; });
                    emailExist = users.find(function (item) { return item.email === email; });
                    message = "";
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    if (!(!loginExist && !emailExist)) return [3 /*break*/, 5];
                    return [4 /*yield*/, db_1.client.query("INSERT INTO facelessbook.users (first_name,last_name,email,login,password) VALUES ('".concat(name, "','").concat(lastName, "', '").concat(email, "', '").concat(login, "', '").concat(hashedPassword, "')"))];
                case 4:
                    _b.sent();
                    message = "registration successful";
                    _b.label = 5;
                case 5:
                    if (loginExist) {
                        message = "this login is already in use. create a new login.";
                    }
                    if (emailExist) {
                        message += "this email is already in use";
                    }
                    return [2 /*return*/, message];
                case 6:
                    err_3 = _b.sent();
                    throw new Error("error database ".concat(err_3.message));
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
