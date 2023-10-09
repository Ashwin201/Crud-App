//@ts-nocheck
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
async function fetchPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blog/`, {
      cache: "no-store",
    })
    if (!res) {
      throw new Error("Failed to fetch the data.")
    }
    const data = await res.json();
    return data.posts;
  }
  catch (err) {
    console.log("Error :" + err)
  }


}






const Post = async () => {

  if (!process.env.NEXT_PUBLIC_BASE_API_URL) {
    return null;
  }
  const posts = await fetchPosts();
  return (
    <div>
      {
        //@ts-ignore
        posts && posts.map((item) => (
          <div
            className=" flex flex-col  w-100 border-2 border-slate-400 rounded-lg p-4 md:p-6 mb-4"
            key={item.id}
          >
            <div className="">
              <div className="flex justify-between ts-start">
                <h2 className=" text-2xl font-bold mb-3">{item.title}</h2>
                <div className="flex  ">
                  <Link
                    href={`/edit/${item.id}`}
                    aria-label="editpost"
                    className="text-black hover:scale-95 transition-all duration-300 ml-3"
                  >
                    <BiEdit size={27} />
                  </Link>
                </div>
              </div>
              <p className=" text-gray-800 font-medium text-[16px] mb-3">{item.description}</p>

            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Post;
