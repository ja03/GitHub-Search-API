import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../assets/icons/SearchFilled.png";
import starIcon from "../assets/icons/StarBorderOutlined.png";

import UserCard from "../components/UserCard";

import { User } from "../utils/types";

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [fetchedData, setFetchedData] = useState<Array<User>>([]);
    const [page, setPage]= useState<number>(1)
    const [perPage] = useState<number>()
    useEffect(()=>{
        if(searchInput.length === 0){
            setFetchedData([])
        }else if (searchInput.length >= 3) {
            getUsers(searchInput);
        }
    },[searchInput])
    // API Calling
    const getUsers = async (q: string): Promise<object | void> => {
        await fetch(`https://api.github.com/search/users?q=${q}&per_page=2&page=3`)
            .then((r) => r.json())
            .then((d) => {
                let usersArr = d.items.map((i: any) => {
                    let userObj: User = {
                        user_avatar: i.avatar_url,
                        user_login: i.login,
                        user_full_name: "",
                        user_bio: "",
                        user_followers: 0,
                        user_following: 0,
                        user_public_repos: 0,
                    };
                    return userObj;
                });
                setFetchedData(usersArr);
                return d.items;
            })
            .catch((e) => console.warn(e));
    };
    const handleScroll = (q:string)=>{
        const {scrollTop, clientHeight} = document.documentElement;
        let scrollPosition = scrollTop >= clientHeight -10 && scrollTop <= clientHeight + 10
        let pageNum = page <=34
        if(pageNum && scrollPosition){
            getUsers(q)
            setPage(page+1)
        }

        console.log(scrollTop, clientHeight)
    }
    return (
        <div>
            <div className="w-full shadow-md flex flex-col justify-center items-center bg-white h-[86px] p-2">
                <div className="flex items-center  w-[600px] justify-between">
                    <div className="flex gap-2 items-center">
                        <div>
                            <img
                                src={searchIcon}
                                alt="search-icon"
                                className="w-full h-auto"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for GitHub users"
                            className="text-[21px] outline-0"
                            value={searchInput}
                            // use the Form react router component
                            onChange={(e) => {
                                setSearchInput(e.target.value.toString());
                            }}
                        />
                    </div>
                    <Link to="/favoritos">
                        <img src={starIcon} alt="star-icon" />
                    </Link>
                </div>
            </div>
            {/* List View */}
            <div className="flex flex-col items-center justify-center py-4">
                <div
                    className={
                        fetchedData.length > 0
                            ? "w-[600px] flex flex-col items-center p-2 pb-0 space-y-4 rounded-lg shadow-md bg-white"
                            : ""
                    }>
                    {fetchedData.length > 0 ? (
                        fetchedData.map((user) => {
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

export default Search;
