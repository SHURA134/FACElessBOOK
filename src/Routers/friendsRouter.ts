import {getFriends,addFriend,getFriendsRequest,acceptRequests,deleteFriend} from "../Controllers/friendsController";
import {request, response, Router} from "express";
import {body, validationResult} from "express-validator";
import {authMiddleware} from "../midlewares/midlewareSession";  

export const friendsRouter = Router();

friendsRouter.post('/showFriends',
        body('login').isString(),
        authMiddleware ,
        async (request,response)=>{
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const {login}= request.body;
            response.send(await getFriends(login));
})

friendsRouter.post('/showFriendsRequest',
        body('login').isString(),
        authMiddleware,
        async (request,response)=>{
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const {login}= request.body;
            response.send(await getFriendsRequest(login));
})

friendsRouter.post('/addFriends',
        body('login').isString(),
        body('friendLogin').isString(),
        authMiddleware,
        async (request,response)=>{
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const {login,friendLogin}= request.body;
            response.send(await addFriend(login, friendLogin));
})

friendsRouter.post('/acceptInFriends',
        body('login').isString(),
        body('friendLogin').isString(),
        body('friendId').isNumeric(),
        authMiddleware,
        async (request,response)=>{
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const {login,friendId,answer}= request.body;
            response.send(await acceptRequests(login, friendId, answer));
})

friendsRouter.post('/deleteFriends',
        body('login').isString(),
        body('friendLogin').isString(),
        authMiddleware,
        async (request,response)=>{
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const {login,friendId}= request.body;
            response.send(await deleteFriend(login, friendId));
})