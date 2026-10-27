"use client"
import React, { useEffect, useState } from "react";
import { products } from "@/data/shared";
import Image from "next/image";
import { getData } from "@/api/fetch-data";
import { getLocale, useLocale, useTranslations } from "next-intl";
import FaqSection from "@/app/components/faqSection";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import FaqClient from "@/app/components/faq-client";
import { useCartStore } from "@/stores/cart-store";
import { RiLoader3Fill } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { toast } from "sonner";

function SingleProduct() {
  const t = useTranslations("singleProduct");
  const d = useTranslations("cart");
  const locale = useLocale();
  const { id } = useParams();
  const [single, setSingle] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();
  async function fetchSingleProduct() {
    const result = await getData({ url: `/products/${id}` });
    if (result.code == 200) {
      setSingle(result?.data?.data);
    } else {
      setSingle(null);
    }
  }
  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 800));

      addToCart({
        id,
        title: single?.name,
        price: single?.price_after_discount ? single?.price_after_discount : single?.price,
        img: single?.image[0],
        disc: single?.description
      });

      toast.success(d('addSuccess'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(d('addError'));
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <>
      {single ? (
        <div className="container pb-20 pt-24 lg:pt-32  space-y-12 ">
          <div className=" grid grid-cols-1 md:grid-cols-[40%_60%] gap-12">
            {/* Image */}
            <div>
              <Carousel opts={{ direction: locale === "ar" ? "rtl" : "ltr", }}>
                <CarouselContent>
                  {single?.image?.map((item, idx) => (
                    <CarouselItem key={idx}>
                      <Image
                        src={item}
                        alt={"products"}
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
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-main">{single?.name}</h1>
              <div className="text-gray-300 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: single?.description || "" }}></div>
              <div className="flex items-center gap-4">
                {single?.discount_percentage ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-main">{Number(single?.price_after_discount).toFixed(2)} {t("currency")}</p>
                    <p className="text-gray-400 line-through text-sm">{Number(single?.price).toFixed(2)} {t("currency")}</p>
                    <span className="bg-main text-white text-xs px-2 py-1 rounded">
                      {Number(single?.discount_percentage).toFixed(0)}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-main">{Number(single?.price).toFixed(2)} {t("currency")}</p>
                )}
              </div>
              <div className=" flex items-center gap-2">
                <p className=" text-main font-bold ">{t("category")} :</p>
                <p className=" text-white">{single?.category?.title}</p>
              </div>
              <div className=" flex items-center gap-2">
                <p className=" text-main font-bold ">{t("brand")} :</p>
                <p className=" text-white">{single?.brand?.title}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={` mt-4  text-white capitalize rounded px-4 py-2 ${isAdding ? 'bg-gray-500 cursor-not-allowed' : 'bg-main hover:bg-main/90'
                  } transition-all duration-300 flex items-center gap-2`}
              >
                {isAdding ? (
                  <RiLoader3Fill className="animate-spin text-lg" />
                ) : (
                  <>
                    <BsCart3 className="text-white text-lg" /> {t("btn")}
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <FaqClient />
          </div>
        </div>
      )
        :
        <div className="flex justify-center items-center h-[100vh]">
          <div className="loader"></div>
        </div>
      }

    </>

  );
}

export default SingleProduct;
