"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.acceptRequests = exports.addFriend = exports.getFriendsRequest = exports.getFriends = void 0;
const mongo_1 = require("../Models/mongo");
const startDb_1 = require("../startDb");
async function getFriends(login) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        if (user.friends.length === 0) {
            return "your friend's list is empty";
        }
        return user.friends;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.getFriends = getFriends;
async function getFriendsRequest(login) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        if (user.friends_request.length === 0) {
            return "your friend's request is empty";
        }
        return user.friends_request;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.getFriendsRequest = getFriendsRequest;
async function addFriend(login, friendLogin) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        const friend = await usersCollection.findOne({ login: friendLogin });
        if (!user)
            return "This login was not found";
        if (!friend)
            return "there is no user with this login";
        const friendsExist = friend.friends.indexOf(login) !== -1;
        const friendsRequestExist = friend.friends_request.indexOf(login) !== -1;
        if (friendsExist) {
            return "this user is already your friend";
        }
        if (friendsRequestExist) {
            return "You have already sent a request to this user. wait for confirmation";
        }
        friend.friends_request.push(login);
        await usersCollection.updateOne({ login: friendLogin }, { $set: { friends_request: friend.friends_request } });
        return `${friendLogin} received your request `;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.addFriend = addFriend;
async function acceptRequests(login, requestId, answer) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        if (user.friends_request.length === 0 || requestId >= user.friends_request.length) {
            return "no such request exists";
        }
        if (answer) {
            user.friends.push(user.friends_request[requestId]);
            user.friends_request.splice(requestId);
            await usersCollection.updateOne({ login: login }, { $set: { friends_request: user.friends_request, friends: user.friends } });
            return user.friends;
        }
        user.friends_request.splice(requestId);
        await usersCollection.updateOne({ login: login }, { $set: { friends_request: user.friends_request } });
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.acceptRequests = acceptRequests;
async function deleteFriend(login, friendId) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        const friendExist = user.friends.indexOf(friendId);
        if (!friendExist) {
            return "this user is not in your friends list";
        }
        user.friends.splice(friendId);
        await usersCollection.updateOne({ login: login }, { $set: { friends: user.friends } });
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.deleteFriend = deleteFriend;
mongo_1.client.connect();
