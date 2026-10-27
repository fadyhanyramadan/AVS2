import { getData } from "@/api/fetch-data";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client"; //server
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import ContactBtn from "./contact-btn";
const HeroSection = async () => {
  const t =await getTranslations("home");
let data;
const res  = await getData({url:"/heroes"});
if(res.code==200){
  data=res?.data?.data
}else{
  data=null
}

  return (
    data==null?null:
    <div className="  bg-[url('/wallpaper.jpg')] bg-cover bg-center">
      <div className=" bg-gradient-to-t from-black to-transparent  lg:min-h-screen  flex items-end justify-center ">
        <div className="container  pt-30 lg:pb-20 text-white grid grid-cols-12 gap-6  items-center ">
          {/* content */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              duration: 0.8,
            }}
            className=" col-span-12 lg:col-span-6 flex flex-col gap-6 max-lg:text-center"
          >
            <div
              className="max-lg:m-auto transition-all duration-300  
  flex items-center gap-2 text-main w-fit text-sm bg-white rounded-full px-3 py-1 font-bold group"
            >
              <span className="bg-main size-8 rounded-full flex items-center justify-center">
                <MdWavingHand className="text-white text-sm transition-transform duration-300 group-hover:rotate-45" />
              </span>
              {t("welcome")}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl leading-10 lg:leading-16 ">
              <span className="text-main font-extrabold ">
                {data?.title.split(" ")[0]||t("title").split(" ")[0]}
              </span>{" "}
              {data?.title.split(" ").slice(1).join(" ")|| t("title").split(" ").slice(1).join(" ")}
            </h1>
            <p className=" text-gray-400 text-sm">{data?.description ||t("disc")}</p>
            <ContactBtn/>
          </motion.div>

          {/* image  */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              duration: 0.8,
            }}
            className="max-lg:hidden  lg:col-span-6"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                className=" m-auto  object-contain w-[70%]"
                src={data?.image}
                alt={data?.title}
                width={550}
                height={550}

              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
