
"use client"
//@ts-nocheck
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdatePostParams = {
    title: string;
    description: string;
    id: string;
}
const updatePost = async (data: UpdatePostParams) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({ title: data.title, description: data.description }),
        //@ts-ignore
        "Content-Type": "application/json"
    })

    return await res.json();
}

const getPostById = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/${id}`);
    const data = await res.json();
    return data.post;
}




// delete
const deletePost = async (id: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/${id}`, {
        method: "DELETE",
        //@ts-ignore
        "Content-Type": "application/json"
    })

    return await res.json();
}

const Edit = ({ params }: { params: { id: string } }) => {
    const router = useRouter()

    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        toast.loading("Fetching Post 🚀", { id: "4" })
        getPostById(params.id).then((data) => {
            if (titleRef.current && descriptionRef.current) {
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
            }
            toast.success("Fetching Completed 👍", { id: "4" })

        }).catch((err) => {
            console.log(err)
            toast.error("Error Fetching Post ❗", { id: "4" })
        })

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (descriptionRef.current && titleRef.current) {
            toast.loading("Post Updating 🚀", { id: "3" })
            await updatePost({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                id: params.id
            }
            )
            toast.success("Posted Updated Successfully 👍", { id: "3" })
            router.push("/");
            router.refresh();
        }

    }

    // DELETE
    const handleDelete = async () => {
        toast.loading("Deleting Post 🚀", { id: "2" })
        await deletePost(params.id)
        toast.success("Post Deleted Successfully 👍", { id: "2" })
        router.push("/");
        router.refresh();
    }
    return (
        <div className="relative  w-full h-full border-2 rounded-lg">
            <Toaster />
            <form className="  justify-center   flex flex-col w-100  p-4 md:p-6 rounded-xl" onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={titleRef}
                    placeholder="Enter Title"
                    className=" placeholder:text-gray-400  border-2 border-gray-300  text-gray-600  p-3  rounded-lg outline-none"
                />
                <textarea
                    rows={7}
                    ref={descriptionRef}
                    placeholder="Enter Description"
                    className="  placeholder:text-gray-400 border-2 border-gray-300  p-3 mt-5 mb-14 rounded-lg resize-none overflow-hidden outline-none"
                />
                <button
                    type="submit"

                    className=" absolute left-5 top-[310px] flex gap-2 items-center w-fit px-3 py-1 md:py-2 bg-green-600 text-white font-medium rounded-lg border-2 hover:scale-95 hover:bg-green-700 transition-all duration-300"
                >
                    Update<FaRegEdit size={20} />
                </button>


            </form>
            <button
                onClick={handleDelete}
                type="submit"
                className=" absolute right-5 top-[310px] flex gap-2 items-center w-fit px-3 py-1 md:py-2 bg-red-600 text-white font-medium rounded-lg border-2 border-red-600 hover:scale-95 hover:bg-red-800 transition-all duration-300"
            >
                Delete <RiDeleteBin5Fill size={27} />
            </button>
        </div>
    );
};

export default Edit;