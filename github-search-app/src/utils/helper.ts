import { User } from "./types"
const handleFavUser = (user:User):void =>{
    // chechk if user in array
    const favUsers : any = localStorage.getItem('FavUsers') ?? []
    let usersFromStorage: any= JSON.parse(favUsers)

    let inArray = favUsers.includes(favUsers)
    if(inArray){
        // item will be poped out
        // let newArr = favUsers.filter(u =>{
        //     return (u !== user)
        // })
    }else{
        let newArr:User[];
        // newArr = JSON.parse(localStorage.getItem('FavUsers') ? [])
    }
    localStorage.setItem('users', JSON.stringify(user))
}
