
import { getData } from "@/api/fetch-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as motion from "motion/react-client"; //server
import { getLocale, getTranslations } from "next-intl/server";
import Header from "./header";
import ServCard from "./servCard";

async function ServicesSection() {
  const t = await getTranslations("services");
  const d = await getTranslations("servHeader");
  const locale = await getLocale()
  const imgs = ["/serv1.png", "/serv2.png", "/serv3.png"];

  let data;
  const res = await getData({ url: "/services" });
  if (res.code == 200) {
    data = res?.data?.data
  } else {
    data = []
  }

  return (
    data?.length == 0 ? null :
      <div className=" container space-y-8 py-12 lg:py-20" >
        <Carousel
          className={"mx-auto max-w-[90%] md:max-w-full space-y-8"}
          opts={{
            loop: true,
            align: "start",
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="max-md:flex-col flex items-center max-md:gap-4 justify-between">
            <Header title={d("title")} disc={d("disc")} />
            <div
              className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse justify-end" : ""
                }`}
            >
              <CarouselPrevious
                className={
                  "hover:bg-main transition-all duration-300 size-9 cursor-pointer border-0  static translate-0"
                }
              />
              <CarouselNext
                className={
                  "hover:bg-main transition-all duration-300 size-9 cursor-pointer border-0  static translate-0"
                }
              />
            </div>
          </div>

          <CarouselContent>
            {data?.map((item, idx) => (

              <CarouselItem key={idx} className="basis-3/4 md:basis-1/2 lg:basis-1/4 ">
                <motion.div
                  initial={{ opacity: 0, x: 10, y: -30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.2 }}

                >
                  <ServCard id={item?.id || idx + 1} header={item?.title || t(`header` + (idx + 1))} disc={item?.description || t(`disc` + (idx + 1))} img={item?.logo} />
                </motion.div>
              </CarouselItem>

            ))}

          </CarouselContent>
        </Carousel>



      </div>
  );
}

export default ServicesSection;
