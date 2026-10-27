import { getData } from "@/api/fetch-data";
import SideBar from "@/app/components/sideBar";
import { services } from "@/data/shared";
import * as motion from "motion/react-client"; //server
import Image from "next/image";
async function SingleService({ params }) {
      const id =await params?.id;
           let all,single;
           const res = await getData({ url: "/services" });
           if (res.code == 200) {
             all = res?.data?.data;
           } else {
             all = null;
           }
       
           const result = await getData({ url: `/services/${id}` });
           if (result.code == 200) {
             single = result?.data?.data;
           } else {
             single = null;
           }
       
         const otherServices = all?.filter((item) => item.id !== Number(id))
      
  return (
    <div className=" container pb-20 pt-24 lg:pt-32  ">
      <div className="container grid grid-cols-12 xl:gap-x-10 gap-y-12 ">
        {/* content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 xl:col-span-8 space-y-6"
        >
          <h1 className="lg:text-3xl text-2xl font-bold leading-tight text-main">
            {single?.title}
          </h1>
          <Image
            src={single?.image}
            alt={single?.title}
            width={500}
            height={500}
            className="object-cover w-full h-[45vh] rounded-xl "
          />
          <div className="  text-gray-400 space-y-6">
            <p>{single?.description}</p>
          </div>
        </motion.div>
        {/* author & related */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 xl:col-span-4 space-y-6"
        >
 
          <div className="space-y-6">
            <h2 className=" text-2xl font-semibold text-main">Related Services</h2>
           <SideBar page="services" other={otherServices} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SingleService
