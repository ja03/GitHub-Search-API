import { Link } from "react-router-dom";

import backArrowIcon from "../assets/icons/ArrowBackFilled.png";
import filledStarIcon from "../assets/icons/StarFilled.png";

const Favoritos = () => {
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
                <div></div>
            </div>
        </div>
    );
};

export default Favoritos;
