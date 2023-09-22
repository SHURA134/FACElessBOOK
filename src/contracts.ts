export interface IRegisterProfile{
    login:string,
    password:string,
    name? :string,
    last_name? :string,
    age? :number,
    avatar_link?:string,
    friends: Array<number>,
    friends_request: Array<number>
}