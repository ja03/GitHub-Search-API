// react router
import { useLoaderData, Link } from "react-router-dom";

// asstes
import backArrowIcon from "../../assets/icons/ArrowBackFilled.png";
import filledStarIcon from "../../assets/icons/StarFilled.png";
import starIcon from "../../assets/icons/StarBorderOutlined.png";

const UserDets = () => {
    const user: any = useLoaderData();
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
                        <p className="text-[21px]">@{user.login}</p>
                    </div>
                    <img src={true ? filledStarIcon : starIcon} alt="star-icon" />
                </div>
            </div>
            <div className="w-[600px] my-2 mx-auto flex gap-4 items-center p-2 rounded-md shadow-md bg-white relative">
                <img src={true ? filledStarIcon : starIcon} alt="star-icon" className="absolute top-2 right-2"/>
                <div className="min-w-[150px] w-[150px] h-[150px] min-h-[150px]">
                    <img
                        src={user.avatar_url}
                        alt="user-avatar"
                        className="w-full h-auto rounded-md "
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-[28px]">{user.name}</h3>
                        <p className="text-[14px] text-[#2D9CDB]">
                            @{user.login}
                        </p>
                        <p className="text-[14px] text-[#8D8D8D]">{user.bio}</p>
                    </div>
                    <div className="flex items-center gap-[28px]">
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.followers}</p>
                            <p className="text-[14px] text-[#8D8D8D]">
                                FOLLOWERS
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.following}</p>
                            <p className="text-[14px] text-[#8D8D8D]">
                                FOLLOWING
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[28px]">{user.public_repos}</p>
                            <p className="text-[14px] text-[#8D8D8D]">REPOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDets;
