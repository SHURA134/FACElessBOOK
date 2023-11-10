import {articleCreate,getArticles,deleteArticle,updateArticle} from "../Controllers/articlesController";
import {request, response, Router} from "express";
import {body, validationResult} from "express-validator";
import {authMiddleware} from "../midlewares/midlewareSession";

export const articlesRouter = Router();

articlesRouter.get("/getArticles", async (request, response)=>{
        const login :any = request.query.login;
        response.send(await getArticles(login));
    })

articlesRouter.post("/createArticle",
    body('login').isString(),
    body('title').isString(),
    body('content').isString(),
    async (request, response)=>{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }

        const {login,title,content} = request.body;
        response.send(await articleCreate(login,title,content));
    })

articlesRouter.delete("/deleteArticle",
    body('login').isString(),
    body('title').isString(),
    async (request, response)=>{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }

        const {login,title} = request.body;
        response.send(await deleteArticle(login,title));
    })

articlesRouter.post("/updateArticle",
    body('login').isString(),
    body('title').isString(),
    body('content').isString(),
    async (request, response)=>{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }

        const {login,title,content} = request.body;
        response.send(await updateArticle(login,title,content));
    })


