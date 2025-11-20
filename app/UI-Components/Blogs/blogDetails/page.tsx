"use client";

import blogData from "@/app/JsonData/Blogs.json";
import { useParams } from "next/navigation";
import Link from "next/link";

const BlogDetails = () => {
  const { id } = useParams(); // dynamic id catch karega

  const blog = blogData.find((b) => b.id.toString() === id);

  if (!blog) return <div>No Blog Found</div>;

  return (
    <>
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">
            Blog Details :
            <span className="text-xl font-normal hidden lg:block ps-2">
              {blog.title}
            </span>
          </h2>

          <div className="flex">
            <Link href="/" className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Blog Details
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-1/2">
            <div className="blog-detail">
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-md w-full mb-5"
              />
              <h1 className="text-2xl font-bold mb-3">{blog.title}</h1>
              <p className="text-gray-700 leading-relaxed">{blog.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;