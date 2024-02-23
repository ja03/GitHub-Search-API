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
        let newArr = favUsers.filter((u) => {
            return u.user_login !== user.user_login;
        });
        localStorage.setItem("favUsers", JSON.stringify(newArr));
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
