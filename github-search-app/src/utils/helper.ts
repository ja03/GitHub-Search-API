import { User } from "./types"
const handleFavUser = (user:User, users:User[]=[]):void =>{
    // chechk if user in array
    let favUsersItem : string = localStorage.getItem('FavUsers') ?? " "
    let favUsers:(object)[] = JSON.parse(favUsersItem)
    let inArray = favUsers.includes(favUsers)
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
