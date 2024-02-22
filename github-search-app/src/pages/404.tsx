import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            <h3 className="text-xl">Something went wrong 🤖</h3>
            <p className="text-lg">
                It's seems that you have encountered an error{" "}
                <Link to="/" className="underline">go back</Link>
            </p>
        </div>
    );
};

export default ErrorPage;