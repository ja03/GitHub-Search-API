import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { User } from "../utils/types";
import { getFavUsers } from "../utils/helper";

import UserCard from "../components/UserCard";

// assets
import backArrowIcon from "../assets/icons/ArrowBackFilled.png";
import filledStarIcon from "../assets/icons/StarFilled.png";

const Favoritos = () => {
    const [users, setUsrs ] = useState<Array<User>>(getFavUsers())
    useEffect(()=>{
        setUsrs(getFavUsers())
    }, users)
    return (
        <div>
            <div className="w-full shadow-md flex flex-col justify-center items-center bg-white h-[86px] p-2">
                <div className="flex items-center  w-[600px] justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to="/">
                            <img
                                src={backArrowIcon}
                                alt="search-icon"
                                className="w-full h-auto"
                            />
                        </Link>
                        <p className="text-[21px]">Favorites</p>
                    </div>
                    <img src={filledStarIcon} alt="star-icon" />
                </div>
            </div>
            {/* List View */}
            <div className="flex flex-col items-center justify-center py-4">
                <div
                    className={
                        users.length > 0
                            ? "w-[600px] flex flex-col items-center p-2 pb-0 space-y-4 rounded-lg shadow-md bg-white"
                            : ""
                    }>
                    {users.length > 0 ? (
                        users.map((user) => {
                            return (
                                <div
                                    className="w-full flex flex-col "
                                    key={user.user_login}>
                                    <UserCard userData={user} />
                                    <div className="w-full h-[2px] bg-[#D9D9D9] mt-2 mx-auto"></div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <p className="text-[14px]">No search results...</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favoritos;
