'use client'
//@ts-nocheck

import React from 'react'
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { Base_API_URL } from '@/utils/constants';
async function fetchPosts() {
  const res = await fetch(`${Base_API_URL}/api/blog`, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: 'application/json',
    },
    //@ts-ignore
    "Content-Type": "application/json"
  })
  if (!res) {
    throw new Error("Failed to fetch the data.")
  }
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
        //@ts-ignore
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
              <p className=" text-gray-800 font-medium text-[16px] mb-3">{item.description}</p>
              {/* {data?.user ? (
                <div className='flex items-center justify-center sm:justify-normal flex-col sm:flex-row text-center sm:text-start '>
                  <p className='text-gray-600 font-medium text-[15px] mb-2 sm:mr-2  '>Post Created by :-&nbsp;</p>
                  <Image
                    //@ts-ignore
                    src={data?.user?.image}
                    alt="img"
                    width={32}
                    height={32}
                    className=" rounded-[50%]   flex border-gray-600 mb-1 sm:mb-0 "
                  />
                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-gray-700 font-medium text-[13px] ml-2'>Name:&nbsp;{data?.user?.name}</p>
                    <p className='text-gray-700 font-medium text-[13px] ml-2'>Email:&nbsp;{data?.user?.email}</p>
                  </div>
                </div>
              ) : (
                ""
              )} */}
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Post;
