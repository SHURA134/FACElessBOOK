"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const mongo_1 = require("../Models/mongo");
async function createProfile(login, password, name, last_name, age, avatar_link) {
    await mongo_1.client.connect()
        .catch(err => {
        console.log("err", err);
    });
    const db = await mongo_1.client.db('blogs-service');
    const profilesCollection = await db.collection('blogs');
    const loginExist = await profilesCollection.findOne({ login });
    if (loginExist) {
        console.log("return false because user is already exist ");
        return false;
    }
    const newProfile = {
        login,
        password,
        name,
        last_name,
        age,
        avatar_link,
        friends: [],
        friends_request: []
    };
    await profilesCollection.insertOne(newProfile);
    return true;
}
exports.createProfile = createProfile;
mongo_1.client.connect();
