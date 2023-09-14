
import {createTable,createUser} from '../Controllers/usersController';
import {Router,Request,Response} from "express";

export const usersRouter=Router();

usersRouter.get("/", async (request : Request, response : Response) =>{
    await createTable();
});

usersRouter.post("/registration", async (request : Request, response : Response) =>{

    const {name,lastName,login,password,email}: {name:string, lastName:string, email:string, login:string, password:string} = request.body;
    response.send(await createUser({name,lastName,email,login,password} ));

})




