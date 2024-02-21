import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="w-full bg-[#EFEFEF]  min-h-screen h-full">
            <Outlet />
        </div>
    );
};

export default RootLayout;
