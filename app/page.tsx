//eslint-disable
//@ts-nocheck

import React from 'react'
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { Base_API_URL } from './utils/constants';
async function fetchPosts() {
  const res = await fetch(`${Base_API_URL}/api/blog`, { cache: "no-store" })
  const data = await res.json();
  return data.posts;
}
const Post = async () => {
  if (!Base_API_URL) {
    return null;
  }
  const posts = await fetchPosts();
  return (
    <div>
      {
        posts.map((item) => (
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
              <p className=" text-gray-800 font-medium text-[16px]">{item.description}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Post;
