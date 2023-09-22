"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
exports.client = new mongodb_1.MongoClient("mongodb+srv://SHURA:admin@cluster0.mda5pg9.mongodb.net/?retryWrites=true&w=majority");
