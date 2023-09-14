import express from "express";
import bodyParser from 'body-parser';
import {usersRouter} from "./Routers/usersRouter";



export const app=express();
const port: number = 3000;

//@ts-ignore
app.use(express.json());

app.use("/users", usersRouter);

app.listen(port,() => {
    console.log(`Application has successfully started on port ${port}`);
})