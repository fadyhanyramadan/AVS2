import { getData } from "@/api/fetch-data";
import ContactSection from "@/app/components/contactSection";
import SideBar from "@/app/components/sideBar";
import * as motion from "motion/react-client"; //server
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getLocale } from "next-intl/server";
import { GoArrowUpRight } from "react-icons/go";
async function SingleProject({ params }) {
  const locale = await getLocale();

  const id = await params?.id;
  let all, single;
  const res = await getData({ url: "/projects" });
  if (res.code == 200) {
    all = res?.data?.data;
  } else {
    all = null;
  }

  const result = await getData({ url: `/projects/${id}` });
  if (result.code == 200) {
    single = result?.data?.data;
  } else {
    single = null;
  }



  const otherProjects = all?.filter((item) => item.id !== Number(id))
  return (
    single === null ? <div className="container text-2xl py-20 text-main">Project not found</div> :
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
            <Carousel opts={{ direction: locale === "ar" ? "rtl" : "ltr", }}>
              <CarouselContent>
                {single?.image?.map((item, idx) => (
                  <CarouselItem key={idx}>
                    <Image
                      src={item}
                      alt={single?.title}
                      width={500}
                      height={500}
                      className="object-cover w-full h-[45vh] rounded-xl "
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className={`flex items-center gap-2 justify-center mt-8 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                <CarouselPrevious className={"hover:bg-main transition-all duration-300 size-9 cursor-pointer border-0  static translate-0"} />
                <CarouselNext className={"hover:bg-main transition-all duration-300 size-9 cursor-pointer border-0  static translate-0"} />
              </div>
            </Carousel>

            <div className="  text-gray-400 space-y-6">
              <p>{single?.description}</p>
            </div>
            <a
              href={single?.url}
              className="capitalize text-white max-lg:m-auto w-fit flex items-center justify-center gap-2 bg-main rounded-full  text-sm px-5 py-3 hover:gap-3 duration-300 transition-all "
            >
              <GoArrowUpRight className=" text-sm" />
              {locale === "ar" ? "تصفح المشروع" : "Project Details"}
            </a>
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
              <h2 className=" text-2xl font-semibold text-main">Related Projects</h2>
              <SideBar page={"projects"} other={otherProjects} />
            </div>
          </motion.div>
          <div className=" col-span-12">
            <ContactSection />
          </div>

        </div>
      </div>
  );
}

export default SingleProject;
