"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = void 0;
const mongo_1 = require("./Models/mongo");
async function getCollection() {
    await mongo_1.client.connect()
        .catch(err => {
        console.log("err", err);
    });
    const db = await mongo_1.client.db('facelessBook');
    return db.collection('users');
}
exports.getCollection = getCollection;
