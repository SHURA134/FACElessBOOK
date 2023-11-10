import {client} from "../Models/mongo";
import {IRegisterUsers} from "../contracts";
import {getCollection} from "../startDb";

export async function getFriends(login: string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});
        if (user.friends.length === 0) {
            return "your friend's list is empty";
        }
        return user.friends;
    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function getFriendsRequest(login: string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});
        if (user.friends_request.length === 0) {
            return "your friend's request is empty";
        }
        return user.friends_request;
    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }

}


export async  function addFriend(login : string,friendLogin : string){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});
        const friend: any = await usersCollection.findOne({login: friendLogin});

        if (!user) return "This login was not found";
        if (!friend) return "there is no user with this login";
        const friendsExist = friend.friends.indexOf(login)!== -1;
        const friendsRequestExist = friend.friends_request.indexOf(login)!== -1;

        if (friendsExist) {
            return "this user is already your friend";
        }
        if (friendsRequestExist) {
            return "You have already sent a request to this user. wait for confirmation";
        }

        friend.friends_request.push(login);
        await usersCollection.updateOne({login: friendLogin}, {$set : {friends_request : friend.friends_request}});

        return `${friendLogin} received your request `;
    }catch(err : any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function acceptRequests(login : string,requestId : number,answer : boolean){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});

        if(user.friends_request.length===0 || requestId>=user.friends_request.length ){
            return "no such request exists";
        }

        if(answer){
            user.friends.push(user.friends_request[requestId]);
            user.friends_request.splice(requestId);
            await usersCollection.updateOne({login: login}, {$set: {friends_request: user.friends_request, friends: user.friends}});
            return user.friends;
        }

        user.friends_request.splice(requestId);
        await usersCollection.updateOne({login: login}, {$set: {friends_request: user.friends_request}});
    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}

export async function deleteFriend(login : string,friendId : number){
    try {
        const usersCollection = await getCollection();
        const user: any = await usersCollection.findOne({login});

        const friendExist=user.friends.indexOf(friendId);
        if(!friendExist){
            return"this user is not in your friends list";
        }
        user.friends.splice(friendId);
        await usersCollection.updateOne({login: login}, {$set: { friends: user.friends}});

    }catch(err: any) {
        throw new Error(`Error : ${err.message}`)
    }
}



client.connect();