import {client} from "../Models/mongo";
import {IRegisterProfile} from "../contracts";

export async function createProfile(login:string,password:string,name:string,last_name:string,age:number ,avatar_link:string){
    await client.connect()
        .catch(err => {
            console.log("err", err);
        })
    const db = await client.db('blogs-service');
    const profilesCollection = await db.collection('blogs');


    const loginExist= await profilesCollection.findOne({login});
    if(loginExist){
        console.log("return false because user is already exist ");
        return false;
    }


    const newProfile: IRegisterProfile = {
        login,
        password,
        name,
        last_name,
        age,
        avatar_link,
        friends:[],
        friends_request:[]
    }
    await profilesCollection.insertOne(newProfile);
    return true;
}

client.connect();