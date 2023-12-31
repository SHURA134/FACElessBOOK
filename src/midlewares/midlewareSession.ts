export function authMiddleware(request : any    , response : any  , next : any) {
    const login: string = request.body.login;
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
