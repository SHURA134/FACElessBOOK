import {getCollection} from "../startDb";
import {IRegisterUsers} from "../contracts";

export async function getArticles (login : string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});

        if(!user){
            return "this login is not already exist";
        }
        return user.articles;

    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function articleCreate (login : string ,title : string, content: string ){
        try {
            const usersCollection = await getCollection();
            const user: any = await usersCollection.findOne({login});
            const titleExist= user.articles.find((item : any)  => item.title===title);

            if(titleExist){
                return "article with this title is already exist";
            };

            user.articles.push({
                title: title,
                content: content
            })
            await usersCollection.updateOne({login: login}, {$set : {articles: user.articles}});
            
            return user.articles;

        }catch(err: any) {
            throw new Error(`Error : ${err.message}`)
        }
}

export async function deleteArticle(login : string,title : string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});

        const titleExist = user.articles.findIndex((item : any ) => item.title===title);
        if(titleExist === -1){
            return "article with this title not found";
        }

        user.articles.splice(titleExist);
        await usersCollection.updateOne({login: login}, {$set : {articles: user.articles}});
        return "DELETE";

    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function updateArticle(login : string,title : string, content : string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});
        const article= user.articles.find((item : any ) => item.title===title);
        if(!article){
            return "article with this title not found";
        }

        user.articles.find((item : any ) => {
            if (item.title === title) {
                item.content = content;
            }
        });
        await usersCollection.updateOne({login: login,}, {$set : {articles: user.articles}});

        return article;

    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}
