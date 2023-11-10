import {client} from "./Models/mongo";

export async function getCollection(){
    await client.connect()
        .catch(err => {
            console.log("err", err);
        })
    const db = await client.db('facelessBook');
    return  db.collection('users');
}
