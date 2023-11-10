import express from "express";
import bodyParser from 'body-parser';
import {usersRouter} from "./Routers/usersRouters";
import {friendsRouter} from "./Routers/friendsRouter";
import {articlesRouter} from "./Routers/articlesRouter";
import session from 'express-session';



export const app=express();
const port: number = 3000;

//@ts-ignore
app.use(express.json());

//@ts-ignore
app.use(session({
    secret: `secret`,
    name: `session`
}));

app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/articles", articlesRouter);

app.listen(port,() => {
    console.log(`Application has successfully started on port ${port}`);
})