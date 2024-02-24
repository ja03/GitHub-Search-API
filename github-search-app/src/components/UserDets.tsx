import { useState } from "react";

import { useLoaderData, Link} from "react-router-dom";

// asstes
import backArrowIcon from "../assets/icons/ArrowBackFilled.png";
import filledStarIcon from "../assets/icons/StarFilled.png";
import starIcon from "../assets/icons/StarBorderOutlined.png";

import { User } from "../utils/types";
import { handleStarIcon, handleFavUser} from "../utils/helper";

const UserDets = () => {
    const [user]= useState<User| any>(useLoaderData())
    const [isFav, setIsFav] = useState<boolean>(handleStarIcon(user))
    const handleClick=(user:User)=>{
        handleFavUser(user)
        setIsFav(handleStarIcon(user))
    }
    return (
        <div>
            <div className="w-full shadow-md flex flex-col justify-center items-center bg-white h-[86px] p-2">
                <div className="flex items-center  w-[600px] justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to="/">
                            <img
                                src={backArrowIcon}
                                alt="back-arrow-icon"
                                className="w-full h-auto"
                            />
                        </Link>
                        <p className="text-[21px]">@{user.user_login}</p>
                    </div>
                    <img src={isFav ? filledStarIcon : starIcon} alt="star-icon" />
                </div>
            </div>
            <div className="w-[600px] my-2 mx-auto flex gap-4 items-center p-2 rounded-md shadow-md bg-white relative">
                <img src={isFav ? filledStarIcon : starIcon} alt="star-icon" className="absolute top-2 right-2" onClick={()=>handleClick(user)}/>
                <div className="min-w-[150px] w-[150px] h-[150px] min-h-[150px]">
                    <img
                        src={user.user_avatar}
                        alt="user-avatar"
                        className="w-full h-auto rounded-md "
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-[28px]">{user.user_full_name}</h3>
                        <p className="text-[14px] text-[#2D9CDB]">
                            @{user.user_login}
                        </p>
                        <p className="text-[14px] text-[#8D8D8D]">{user.user_bio}</p>
                    </div>
                    <div className="flex items-center gap-[28px]">
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.user_followers}</p>
                            <p className="text-[14px] text-[#8D8D8D]" onClick={()=>{console.log(user.user_login)}}>
                                FOLLOWERS
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.user_following}</p>
                            <p className="text-[14px] text-[#8D8D8D]">
                                FOLLOWING
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.user_public_repos}</p>
                            <p className="text-[14px] text-[#8D8D8D]">REPOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDets;
