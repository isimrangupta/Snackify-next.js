"use client";

import blogData from "@/app/JsonData/Blogs.json";
import Link from "next/link";

const Blogs = () => {
  return (
    <>
      {/* Top Header */}
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Blog</h2>
          <div className="flex">
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              Blog
            </h2>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="px-[8%] lg:px-[12%] py-5 mt-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          
          {/* LEFT SIDE : BLOG LIST */}
          <div className="w-full lg:w-2/3 gap-5 ">
            {blogData.map((blog) => (
              <div key={blog.id}
                className="flex flex-col gap-5 mb-10"
              >
                {/* Blog Image */}
                <div className="blog-image overflow-hidden rounded-md">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>

                {/* Blog Content */}
                <div className="blog-content mt-3">
                  <span className="bg-[#e6f9ef] p-3 shadow-md text-2xl Unbounded">
                    {blog.tag}
                  </span>

                  <h2 className="text-4xl Unbounded mt-5 hover:text-[var(--prim-color)] hover:underline">
                    {blog.title}
                  </h2>

                  <p className="mt-5 text-lg border-b pb-3 border-gray-400">
                    {blog.pere}
                  </p>

                  <div className="flex mt-5 gap-5">
                    <p className="text-gray-500">
                      <i className="bi bi-calendar2-week text-[var(--prim-color)] pr-1"></i>
                      {blog.date}
                    </p>

                    <p className="text-gray-500">
                      <i className="bi bi-chat-text text-[var(--prim-color)] pr-1"></i>
                      {blog.date}
                    </p>
                  </div>
                </div>
               </div>
            ))}
          </div>

          {/* RIGHT SIDE : SIDEBAR */}
          <div className="w-full lg:w-1/2 gap-5 sticky top-22 left-0 h-[100%]">
            <div className="border border-gray-300 rounded">

              {/* Sidebar Heading */}
              <div className="border-b border-gray-300 p-5">
                <h2 className="Unbounded text-2xl">Recent Post</h2>
              </div>

              {/* Recent Post List */}
              <div className="p-5">
                {blogData.map((blog, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-5 gap-5"
                  >
                    <div className="w-1/2">
                      <img src={blog.image} alt={blog.title} />
                    </div>

                    <div className="w-1/2">
                      <div className="blog-content">
                        <h2 className="Unbounded hover:text-[var(--prim-color)] hover:underline">
                          {blog.title}
                        </h2>

                        <div className="flex gap-5 mt-2">
                          <p className="text-gray-500">
                            <i className="bi bi-calendar2-week text-[var(--prim-color)] pr-1"></i>
                            {blog.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Blogs;