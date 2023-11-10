import {IRegisterUsers} from "../contracts";
import  bcrypt from  'bcrypt' ;
import {getCollection} from "../startDb";

const SALT_ROUNDS: number = 3;

export async function createUser(login:string,password:string,name:string,last_name:string,age:number ,avatar_link:string){
    try {
        const usersCollection: any = await getCollection();

        const loginExist: any = await usersCollection.findOne({login});
        if (loginExist) {
            console.log("return false because user is already exist ");
            return false;
        }

        const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser: IRegisterUsers = {
            login,
            password: hashedPassword,
            name,
            last_name,
            age,
            avatar_link,
            friends: [],
            friends_request: [],
            articles: []
        }
        await usersCollection.insertOne(newUser);
        return true;
    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function logInUser(login:string,password:string){
    try {
        const usersCollection: any = await getCollection();

        const loginExist: any = await usersCollection.findOne({login});
        const passwordExist: boolean = await bcrypt.compare(password, loginExist.password);
        if (!loginExist || !passwordExist) {
            console.log("This login was not found. try again or register");
            return false;
        }

        return true;
    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

