import {createUser,logInUser} from "../Controllers/usersController";
import {request, response, Router} from "express";
import {authMiddleware} from "../midlewares/midlewareSession";
import {body, validationResult} from "express-validator";

export const usersRouter = Router();


usersRouter.post('/registration',
    body('login').isString(),
    body('password').isLength({
        min: 3
    })  ,
    body('name').isString(),
    body('last_name').isString(),
    body('age').isNumeric(),
    body('avatar_link').isString(),
    async (request, response) =>{


        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }

        const {login,password,name,last_name,age,avatar_link}= request.body;
        const isProfileCreated = await createUser(login,password,name,last_name,age,avatar_link);
        isProfileCreated
            ? response.send(`${login} , your registration is successful`)
            : response.status(401).send("this login is already registrated");

})


usersRouter.post('/authorization' ,
    body('login').isString(),
    body('password').isLength({
        min: 3
    })
    ,async (request, response) =>{

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }

        const {login,password}= request.body;

        //@ts-ignore
        request.session[login] = await logInUser(login,password);
        //@ts-ignore
        request.session[login]
            ? response.send(`${login} , your authorization is successful`)
            : response.status(401).send("This login was not found. try again or register");

})

usersRouter.post('/logOut', async (request  , response ) =>{
    const {login} = request.body;
    //@ts-ignore
    request.session[login]= undefined;

    return response.status(200).send('logout is successful');
})






