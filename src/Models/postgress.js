"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
exports.client = new pg_1.Client({
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 3000,
    database: process.env.POSTGRES_DB
});
exports.client.connect();
