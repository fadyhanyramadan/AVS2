import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as motion from "motion/react-client"; //server
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Header from "./header";
import { getData } from "@/api/fetch-data";

async function Brands() {
  const t =await getTranslations("brandsHeader");
  const locale =await getLocale();

let data;
const res  = await getData({url:"/brands"});
if(res.code==200){
  data=res?.data?.data
}else{
  data=[]
}

  return (
    data?.length==0 ? null :
    <div className=" container space-y-10 ">
      <Carousel
        className="grid grid-cols-1  lg:grid-cols-[30%_70%]  gap-4 space-y-6 "
        opts={{ loop: true , align: "start",direction: locale === "ar" ? "rtl" : "ltr"}}
          dir={locale === "ar" ? "rtl" : "ltr"} 
      >
        <div className=" space-y-12">
          <Header title={t("title")} disc={t("disc")} />
          <div className={`flex items-center  max-md:justify-center  gap-2 ${
              locale === "ar" ? "flex-row-reverse justify-end" : ""
            }`}>
            <CarouselPrevious className={"static  translate-0 hover:bg-main transition-all duration-300 border-0 cursor-pointer"} />
            <CarouselNext className={"static  translate-0 hover:bg-main transition-all duration-300 border-0 cursor-pointer"} />
          </div>
        </div>

        <CarouselContent>
          {data?.map((item, index) => (
            <motion.div 
                key={index}>
              <CarouselItem
  
                className=" md:basis-1/2 lg:basis-1/3 "
              >
                <div className="p-2 space-y-4">
                  <div className="border-2 border-main rounded-full  size-52 flex items-center justify-center">
                    <Image
                      className=" object-contain  "
                      src={item?.image}
                      width={100}
                      height={100}
                      alt={item?.title}
                    />
                  </div>
                  <p className=" capitalize text-white text-xl font-bold text-center">
                    {item?.title}
                  </p>
                </div>
              </CarouselItem>
            </motion.div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Brands;
