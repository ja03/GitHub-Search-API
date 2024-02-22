import { UserCardProps } from "../utils/types";

// assets
import starIcon from "../assets/icons/StarBorderOutlined.png";
import filledStarIcon from "../assets/icons/StarFilled.png";


const UserCard = ({userData}:UserCardProps) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div
                    className="rounded-full border-2 w-[60px] h-[60px] grid items-center  bg-cover bg-center"
                    style={{ backgroundImage: `url(${userData.user_avatar})` }}>
                    {/* <img src={demoImg} alt="user-avatar" className="w-full h-full rounded-full "/> */}
                </div>
                <p className="text-[18px]">@{userData.user_login}</p>
            </div>
            {false ? (
                <img src={filledStarIcon} alt="filled-star-icon" />
            ) : (
                <>
                    <img src={starIcon} alt="star-icon" />
                </>
            )}
        </div>
    );
};

export default UserCard;
