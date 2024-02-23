import { User } from "./types"
export const handleFavUser = (user:User, users:User[]=[]):void =>{
    // chechk if user in array
    let favUsersItem : string = localStorage.getItem('FavUsers') ?? " "
    let favUsers:(object)[] = JSON.parse(favUsersItem)
    let inArray = favUsers.includes(user)
    if(inArray){
        // pop item 
        let newArr = favUsers.filter(u =>{
            return (u !== user)
        })
        localStorage.setItem('favUsersItem', JSON.stringify(newArr))
    }else{
        // add item 
        users.push(user)
        localStorage.setItem('FavUsers', JSON.stringify(users))
    }
    localStorage.setItem('users', JSON.stringify(user))
}
export const handleStarIcon= (user:User):boolean=>{
    let favUsersItem : string = localStorage.getItem('FavUsers') ?? " "
    let favUsers:(object)[] = JSON.parse(favUsersItem)
    return favUsers.includes(user)
}