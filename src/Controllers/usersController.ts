import { client } from "../Models/postgress";
import bcrypt from 'bcrypt';
//Реализуйте систему регистрации и аутентификации пользователей.
//Пользователи должны иметь уникальные идентификаторы, их личные данные (имя, фамилия, электронная почта, пароль и т. д.) должны храниться в SQL базе данных.
//Профили пользователей:
const SALT_ROUNDS = 10;

export async function createTable() {
    try{
        await client.query(`CREATE TABLE IF NOT EXISTS facelessbook.users (
                                        ID serial4 NOT NULL,
                                        first_name varchar(10),
                                        last_name varchar(20),
                                        email varchar(30),
                                        login varchar (10),
                                        password varchar(100),
                                        PRIMARY KEY (ID)  )`);

    }catch(err: any){
        throw new Error(`error database ${err.message}`);
    }
}

async function getUsers(){
    try{
        const users = await client.query(`SELECT * FROM facelessbook.users `);
        return users.rows;
    }catch(err: any){
        throw new Error(`error database ${err.message}`);
    }
}

export async function createUser({name,lastName,email,login,password} : {name:string, lastName:string, email:string, login:string, password:string}){
    const users = await getUsers();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const loginExist = users.find((item : any) => item.login === login);
    const emailExist = users.find((item : any)  => item.email === email);
    let message="";
    try{
        if(!loginExist && !emailExist){
            await client.query(`INSERT INTO facelessbook.users (first_name,last_name,email,login,password) VALUES ('${name}','${lastName}', '${email}', '${login}', '${hashedPassword}')`);
            message="registration successful";
        }if(loginExist){
            message="this login is already in use. create a new login.";
        }if(emailExist){
            message +="this email is already in use";
        }
        return message;
    }catch(err: any){
       throw new Error(`error database ${err.message}`);
    }
}

