"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiAddToQueue } from "react-icons/bi";
import { Base_API_URL } from "../utils/constants";
const addPost = async ({ title, description }: {
    title: string;
    description: string;
}) => {

    const res = await fetch(`${Base_API_URL}/api/blog`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        //@ts-ignore
        "Content-Type": "application/json"
    })

    return await res.json();
}

const AddPost = () => {
    const router = useRouter()

    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (descriptionRef.current && titleRef.current) {
            toast.loading("Posting... ", { id: "1" })
            await addPost({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value
            }
            )
            toast.success("Posted Successfully 👍", { id: "1" })

        }
        router.push("/");
        router.refresh();
    }
    return (
        <div>
            <Toaster />
            <form className="  w-full h-full justify-center   flex flex-col w-100 border-2  p-4 md:p-6 rounded-xl" onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={titleRef}
                    placeholder="Enter Title"
                    className=" placeholder:text-gray-400 placeholder:m-3 p-3  border-2 border-gray-300  text-gray-600    rounded-lg outline-none"
                />
                <textarea
                    rows={7}
                    ref={descriptionRef}
                    placeholder="Enter Description"
                    className=" placeholder:text-gray-400 placeholder:m-3  border-2 border-gray-300  p-3 pb-3 my-5 rounded-lg resize-none overflow-hidden outline-none "
                />
                <button
                    type="submit"
                    className=" flex gap-2 items-center w-fit px-3 py-1 md:py-2 bg-green-600 text-white font-medium rounded-lg border-2 border-green-600 hover:scale-95 hover:bg-green-700 transition-all duration-300"
                >
                    Add <BiAddToQueue size={20} />
                </button>
            </form>
        </div>
    );
};

export default AddPost;
