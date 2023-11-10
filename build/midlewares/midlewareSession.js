"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
function authMiddleware(request, response, next) {
    const login = request.body.login;
    console.log("REQUETS", login);
    console.log(request.session[login]);
    if (!login) {
        return response.status(403).send('you must pass login param');
    }
    if (!request.session[login]) {
        return response.status(401).send('unathorized, please login first');
    }
    next();
}
exports.authMiddleware = authMiddleware;
