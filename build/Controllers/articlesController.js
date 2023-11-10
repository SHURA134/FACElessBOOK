"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticle = exports.deleteArticle = exports.articleCreate = exports.getArticles = void 0;
const startDb_1 = require("../startDb");
async function getArticles(login) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        if (!user) {
            return "this login is not already exist";
        }
        return user.articles;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.getArticles = getArticles;
async function articleCreate(login, title, content) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        const titleExist = user.articles.find((item) => item.title === title);
        if (titleExist) {
            return "article with this title is already exist";
        }
        ;
        user.articles.push({
            title: title,
            content: content
        });
        await usersCollection.updateOne({ login: login }, { $set: { articles: user.articles } });
        return user.articles;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.articleCreate = articleCreate;
async function deleteArticle(login, title) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        const titleExist = user.articles.findIndex((item) => item.title === title);
        if (titleExist === -1) {
            return "article with this title not found";
        }
        user.articles.splice(titleExist);
        await usersCollection.updateOne({ login: login }, { $set: { articles: user.articles } });
        return "DELETE";
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.deleteArticle = deleteArticle;
async function updateArticle(login, title, content) {
    try {
        const usersCollection = await (0, startDb_1.getCollection)();
        const user = await usersCollection.findOne({ login });
        const article = user.articles.find((item) => item.title === title);
        if (!article) {
            return "article with this title not found";
        }
        user.articles.find((item) => {
            if (item.title === title) {
                item.content = content;
            }
        });
        await usersCollection.updateOne({ login: login, }, { $set: { articles: user.articles } });
        return article;
    }
    catch (err) {
        throw new Error(`Error : ${err.message}`);
    }
}
exports.updateArticle = updateArticle;
