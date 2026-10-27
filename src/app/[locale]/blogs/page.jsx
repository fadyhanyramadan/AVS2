import Header from "@/app/components/header";
import React from "react";
import * as motion from "motion/react-client"; //server
import BlogCard from "@/app/components/blogCard";
import { getTranslations } from "next-intl/server";
import { getData } from "@/api/fetch-data";


 async function BlogPage() {
  const d =await getTranslations("blogHeader");
  const f =await getTranslations("projects");

  let data;
  const res  = await getData({url:"/blogs"});
  if(res.code==200){
    data=res?.data?.data
  }else{
    data=[]
  }
  return (
    data?.length==0?null:
    <div className=" container  pb-20 pt-24 lg:pt-32  space-y-12 ">
      <Header title={d("title")} disc={d("disc")} align="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <BlogCard
              title={item?.title || f("title1")}
              disc={item?.description || f("disc1")}
              img={item?.image}
              id={item?.id}
            />
          </motion.div>
        ))}
      </div>
  
    </div>
  );
}

export default BlogPage;
