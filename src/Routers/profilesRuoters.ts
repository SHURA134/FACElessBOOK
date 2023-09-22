import {createProfile} from "../Controllers/profilesController";
import {request, Router} from "express";

export const profileRouter = Router();

profileRouter.post('/registration', async (request, response) =>{
    const {login,password,name,last_name,age,avatar_link}= request.body;
    const isProfileCreated = await createProfile(login,password,name,last_name,age,avatar_link);
    isProfileCreated
        ? response.send(`${login} , your registration is successful`)
        : response.status(401).send("this login is already registrated");

})

