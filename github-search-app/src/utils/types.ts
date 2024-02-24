export type User ={
    user_avatar:string,
    user_login:string,
    user_full_name:string,
    user_bio:string,
    user_followers:number,
    user_following:number,
    user_public_repos:number
}
export type UserCardProps={
    userData:User
}
