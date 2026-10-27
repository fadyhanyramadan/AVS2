import React from "react";
import * as motion from "motion/react-client"; //server
import AboutSection from "@/app/components/aboutSection";
import ServicesSection from "@/app/components/servicesSection";
import { getData } from "@/api/fetch-data";
import { getTranslations } from "next-intl/server";


 async function About() {
const t =await getTranslations("about");
let data;
const res  = await getData({url:"/aboutus-tow"});
if(res.code==200){
  data=res?.data?.data
}else{
  data=null
}

  return (
    data==null?null:
    <div className="container  py-16 lg:pt-28 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div
          className=" bg-no-repeat bg-cover bg-center h-[50vh]"
          style={{ backgroundImage: `url(${data?.image})`}}
        >
          <div className="bg-black/60 h-full   flex flex-col items-center justify-center">
            <div className="text-center ">
              <h2 className="lg:text-4xl font-bold text-main ">{t("title")}</h2>
              <p className="text-white ">{t("description")}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className=" grid grid-cols-1 my-20 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h3 className=" text-main text-2xl font-bold">{data?.title_one}</h3>
          <p className=" text-gray-400 leading-7">
            {data?.description_one}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h3 className=" text-main text-2xl font-bold">{data?.title_two}</h3>
          <p className=" text-gray-400 leading-7">
            {data?.description_two} 
          </p>
        </motion.div>
      </div>
      <div>
        <AboutSection />
        <ServicesSection />
      </div>
    </div>
  );
}

export default About;
