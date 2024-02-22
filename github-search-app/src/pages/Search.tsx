import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../assets/icons/SearchFilled.png";
import starIcon from "../assets/icons/StarBorderOutlined.png";
// API Calling
const getUsers= async (q:string):Promise<object | void> => {
    await fetch(`https://api.github.com/search/users?q=${q}`)
            .then(r=> r.json())
            .then(d => {
                console.log(d.items)
                return d.items;
            })
            .catch(e=>console.warn(e))  
}

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>("")
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
                                setSearchInput(e.target.value.toString())
                                if(searchInput.length >=3 ){
                                    getUsers(searchInput)
                                }
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
                <div>
                </div>
            </div>
        </div>
    );
};

export default Search;
