import { useState } from "react";

import { Link } from "react-router-dom";

import { UserCardProps, User } from "../utils/types";
import { handleFavUser, handleStarIcon } from "../utils/helper";

// assets
import starIcon from "../assets/icons/StarBorderOutlined.png";
import filledStarIcon from "../assets/icons/StarFilled.png";

const UserCard = ({ userData }: UserCardProps) => {
    const [isFav, setIsFav]= useState<boolean>(handleStarIcon(userData))
    const handleClick=(user:User)=>{
        handleFavUser(user)
        setIsFav(handleStarIcon(user))
    }
    return (
        <div className="flex justify-between items-center h-[64px]">
            <Link to={`${userData.user_login}`} className="flex-1 flex items-center gap-2">
                <div
                    className="rounded-full border-2 w-[60px] h-[60px] grid items-center  bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${userData.user_avatar})`,
                    }}></div>
                <p className="text-[18px]">@{userData.user_login}</p>
            </Link>
            <img
                src={isFav ? filledStarIcon : starIcon}
                alt="filled-star-icon"
                onClick={() => handleClick(userData)}
            />
        </div>
    );
};

export default UserCard;
