import { getData } from "@/api/fetch-data";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client"; //server
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import Header from "./header";



async function AboutSection() {
  const t = await getTranslations("aboutHeader");
  const d = await getTranslations("about");
  let data;
  const res = await getData({ url: "/aboutus" });
  if (res.code == 200) {
    data = res?.data?.data[0]
  } else {
    data = null
  }

  return (
    data == null ? null :
      <div className=" container py-12 lg:py-20 ">
        <div className=" grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className=" h-full overflow-hidden">
            <Image
              className=" border-1 border-main object-cover w-full  m-auto max-h-[500px]  rounded-3xl"
              src={data?.image || "/about2.jpg"}
              alt={data?.title}
              width={550}
              height={400}
            />
          </motion.div>
          <div className=" space-y-6">
            <Header title={t("title")} disc={data?.title} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className=" text-gray-400 leading-6 "
            >
              {data?.description || d("disc")}
            </motion.p>
            <ul className=" space-y-4">
              {data?.features?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 15, y: -15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className=" flex items-center gap-2 text-white hover:gap-4 transition-all duration-300"
                >
                  <FaCheckCircle className=" text-main " />
                  <p>{item.title || d("point1")} </p>
                </motion.li>
              ))}


            </ul>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <Link
                href={"/aboutus"}
                className="capitalize text-white max-lg:m-auto w-fit flex items-center justify-center gap-2 bg-main rounded-full  text-sm px-5 py-3 hover:gap-3 duration-300 transition-all "
              >
                <GoArrowUpRight className=" text-sm" />
                {d("btn")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
  );
}

export default AboutSection;
