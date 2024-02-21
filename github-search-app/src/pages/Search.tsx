import { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../assets/icons/SearchFilled.png";
import starIcon from "../assets/icons/StarBorderOutlined.png";

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
                <div>
                </div>
            </div>
        </div>
    );
};

export default Search;
