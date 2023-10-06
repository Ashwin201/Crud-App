import Link from "next/link";
import { LuListTodo } from "react-icons/lu";

const Navbar = () => {
    return (
        <>
            <div className="bg-black rounded-lg flex items-center px-3 py-3 md:px-6  md:py-4 justify-between">
                <Link
                    className="text-white md:text-2xl font-bold"
                    href={"/"}
                    aria-label="Home-path"
                >
                    <LuListTodo size={35} />
                </Link>
                <div className=" flex items-center">
                    <Link
                        href={"/"}
                        className="hover:text-green-600 text-white text-[18px] font-medium mr-3 transition-none duration-500 "
                    >
                        Home
                    </Link>
                    <Link
                        href={"/addpost"}
                        className="  px-4 py-[6px] md:py-[6px] bg-black text-white font-medium rounded-lg border-2 border-white  hover:bg-white  hover:text-black transition-all duration-300"
                    >
                        Add Topic
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
