import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function BlogCard({ title, disc,img,id }) {
  return (

      <article className="h-full  space-y-4 border border-main rounded-2xl overflow-hidden group">
        <figure className="h-52 relative">
          <Image src={img} alt={title} fill className="object-cover transform transition-transform duration-300 group-hover:scale-105" />
        </figure>
        <div className="px-4 py-6 space-y-4">
          <h3 className="text-white font-bold line-clamp-2 xl:text-2xl text-xl">{title}</h3>
          <p className="text-gray-400 line-clamp-3">{disc}</p>
          <Link
            href={`/blogs/${id}`}
            className="text-main flex items-center  gap-2 font-bold capitalize hover:gap-4 hover:text-white transition-all duration-300 "
          >
            learn more <MdKeyboardDoubleArrowRight size={20} />
          </Link>
        </div>
        <div className="p-4 border-t border-main text-sm  flex items-center gap-3">
          <div className="size-2 bg-main rounded-full"></div>
          <p className=" text-white">June 29, 2025</p>
        </div>
      </article>
  );
}

export default BlogCard;
