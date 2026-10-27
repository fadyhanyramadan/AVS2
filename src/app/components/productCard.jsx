"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BsCart3 } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import * as motion from "motion/react-client"; //server
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { RiLoader3Fill } from "react-icons/ri";
function ProductCard({ title, disc, img, id, price, discount, price_after_discount, quantity = 0, index = 0 }) {
  const t = useTranslations("singleProduct");
  const c = useTranslations("cart");
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 800));

      addToCart({
        id,
        title,
        price: price_after_discount ? price_after_discount : price,
        img,
        disc
      });

      toast.success(c('addSuccess'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(c('addError'));
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card
        className="py-0 overflow-hidden bg-light-black border-main rounded-3xl relative group"
      >
        <Link href={`/products/${id}`} className="block">
          <CardContent className="aspect-square space-y-4 p-0">
            <div className="relative h-60 w-full aspect-[3/4] overflow-hidden">
              {discount && (
                <div className="absolute top-2 right-2 bg-main text-white px-2 py-1 rounded z-10">
                  {Number(discount).toFixed(0)}%
                </div>
              )}

              <Image
                src={img}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            <div className="px-4 py-8 space-y-4">
              <h3 className="text-lg text-white font-bold">
                {title}
              </h3>
              <p className="text-gray-400 line-clamp-2">
                {disc}
              </p>
              {Number(quantity ?? 0) === 0 ? (
                <p className="text-red-400 text-sm font-semibold">
                  {t("soldOut")}
                </p>
              ) : (
                <>
                  <p className="text-gray-400 text-sm">
                    {t("quantity")}: <span className="text-white font-semibold">{quantity}</span>
                  </p>
                  {Number(quantity) < 5 && (
                    <p className="text-amber-400 text-sm font-semibold">
                      {t("lowStock")}
                    </p>
                  )}
                </>
              )}
              <div>
                {price_after_discount ? (
                  <div className="flex items-center gap-2">
                    <p className="text-main font-bold">{Number(price_after_discount).toFixed(2)} {t("currency")}</p>
                    <p className="text-gray-400 line-through text-sm">{Number(price).toFixed(2)} {t("currency")}</p>
                  </div>
                ) : (
                  <p className="text-main font-bold">{Number(price).toFixed(2)} {t("currency")}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Link>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div
              className="w-[80%] sm:w-1/2 bg-white/90 absolute p-3 rounded-2xl 
                flex items-center justify-around left-1/2 -translate-x-1/2 
                -translate-y-full top-0 
                group-hover:top-1/4 group-hover:-translate-y-0 
                transition-all duration-500 ease-in-out pointer-events-auto"
            >
              <Link href={`/products/${id}`} className="hover:text-main transition-all duration-300">
                <FaRegEye className="text-2xl" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
                disabled={isAdding}
                className="disabled:opacity-50 disabled:cursor-not-allowed hover:text-main transition-all duration-300"
              >
                {isAdding ? (
                  <RiLoader3Fill className="animate-spin text-2xl text-main" />
                ) : (
                  <BsCart3 className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-8 -mt-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full text-sm text-white capitalize rounded-full px-4 py-2 ${
              isAdding ? 'bg-gray-500 cursor-not-allowed' : 'bg-main hover:bg-main/90'
            } transition-all duration-300 flex items-center justify-center gap-2`}
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
      </Card>
    </motion.div>
  );
}

export default ProductCard;
