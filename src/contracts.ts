export interface IRegisterUsers{
    login:string,
    password:string,
    name? :string,
    last_name? :string,
    age? :number,
    avatar_link?:string,
    friends: Array<string>,
    friends_request: Array<string>,
    articles? : IArticles[]
}

interface IArticles {
    title: string
    content : string
}