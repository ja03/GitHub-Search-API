import { User } from "./types";
export const handleFavUser = (user: User): void => {
    // chechk if user in array
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    let inArray:boolean;
    let favUsers: object[] 
    if(favUsersItem.length > 0){
        favUsers = JSON.parse(favUsersItem);
        inArray = favUsers.includes(user);
    }else{
        inArray=false
        favUsers=[]
    }
    if (inArray) {
        // pop item
        let newArr = favUsers.filter((u) => {
            return u !== user;
        });
        localStorage.setItem("favUsersItem", JSON.stringify(newArr));
    } else {
        // add item
        favUsers.push(user);
        localStorage.setItem("FavUsers", JSON.stringify(favUsers));
    }
};
export const handleStarIcon = (user: User): boolean => {
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    if (favUsersItem.length > 0){
        let favUsers: object[] = JSON.parse(favUsersItem);
        if(favUsers.includes(user)){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
    
};
