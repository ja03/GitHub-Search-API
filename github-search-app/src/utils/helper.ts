import { User } from "./types";
export const handleFavUser = (user: User): void => {
    // chechk if user in array
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    let inArray: boolean;
    let favUsers: User[];
    if (favUsersItem.length > 0) {
        favUsers = JSON.parse(favUsersItem);
        inArray = handleStarIcon(user);
    } else {
        inArray = false;
        favUsers = [];
    }
    if (inArray) {
        // pop item
        console.log("removing user")
        let newArr;
            newArr = favUsers.filter((u) => {
                return u.user_login !== user.user_login;
            });
        localStorage.setItem("FavUsers", JSON.stringify(newArr));
    } else {
        // add item
        console.log("adding user")
        favUsers.push(user);
        localStorage.setItem("FavUsers", JSON.stringify(favUsers));
    }
};
export const handleStarIcon = (user: User): boolean => {
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    if (favUsersItem.length > 0) {
        let favUsers: User[] = JSON.parse(favUsersItem);
        return favUsers.some((u) => {
            return u.user_login === user.user_login;
        });
    } else {
        return false;
    }
};
export const getFavUsers = (): User[] =>{
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    let favUsers: User[] = JSON.parse(favUsersItem);
    return favUsers ? favUsers : [];
}
export const updateFavUserDets = (user:User)=>{
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    let favUsers: User[] = JSON.parse(favUsersItem);
    if(favUsers.length > 0){
        favUsers = favUsers.map(u=>{
            if(u.user_login === user.user_login){
                return {
                    user_avatar:user.user_avatar,
                    user_login:user.user_login,
                    user_full_name:user.user_full_name,
                    user_bio:user.user_bio,
                    user_followers:user.user_followers,
                    user_following:user.user_following,
                    user_public_repos:user.user_public_repos
                }
            }
            else{
                return u
            }
        })
    }
    localStorage.setItem("FavUsers", JSON.stringify(favUsers));
}
// loader function
export const userDetailsLoader = async ({ params }: any):Promise<User> => {
    const { username } = params;
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
            const userData = await res.json();
            let userObj:User={
                user_avatar:userData.avatar_url,
                user_login:userData.login,
                user_full_name:userData.name,
                user_bio:userData.bio,
                user_followers:userData.followers,
                user_following:userData.following,
                user_public_repos:userData.public_repos
            }
            return userObj;
        } else {
            console.warn("lol api broke again");
            let userObj:User={
                user_avatar:"",
                user_login:"",
                user_full_name:"",
                user_bio:"",
                user_followers:0,
                user_following:0,
                user_public_repos:0,
            }
            return userObj;
        }
    } catch (e) {
        console.warn(e);
        let userObj:User={
            user_avatar:"",
            user_login:"",
            user_full_name:"",
            user_bio:"",
            user_followers:0,
            user_following:0,
            user_public_repos:0,
        }
        return userObj;
    }
};