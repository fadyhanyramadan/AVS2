import React from "react";
import Header from "./header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./productCard";
import { getLocale, getTranslations } from "next-intl/server";
import { getData } from "@/api/fetch-data";




async function ProductsSection() {
  const t =await getTranslations("productHeader");
  const locale =await getLocale();
    let data;
    const res = await getData({ url: "/products" });
    if (res.code == 200) {
      data = res?.data?.data;
    } else {
      data = [];
    }
  
  return (
    data?.length==0 ? null :
    <div className=" container  py-12 lg:py-20">
      <Carousel
        className={"mx-auto max-w-[90%] md:max-w-full space-y-8"}
        opts={{ loop: true, align: "start" ,direction: locale === "ar" ? "rtl" : "ltr" }}
        dir={locale === "ar" ? "rtl" : "ltr"} 
      >
        <div className="max-md:flex-col flex items-center max-md:gap-4 justify-between">
          <Header title={t("title")} disc={t("disc")} />
          <div className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
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
            <CarouselItem
              key={item?.id ?? idx}
              className="basis-3/4 md:basis-1/2 lg:basis-1/4"
            >
              <ProductCard index={idx} id={item?.id} price={item?.price} title={item?.name} disc={item?.description} img={item?.image[0]} discount={item?.discount_percentage} price_after_discount={item?.price_after_discount} quantity={item?.quantity}/>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </div>
  );
}

export default ProductsSection;
