"use client"

import CartItem from "@/app/components/cartItem";
import React from "react";
import * as motion from "motion/react-client"; //server
import { useCartStore } from "@/stores/cart-store";
import { useTranslations } from "next-intl";
import { BsCartX } from "react-icons/bs";
import CartForm from "@/app/components/cartForm";
import { useSiteSettings } from "@/stores/site-setting";
function Cart() {
  const { items } = useCartStore();
  const t = useTranslations("singleProduct");
  const c = useTranslations("cart");

  // Calculate total price
  const totalPrice = (items || []).reduce((total, item) => {
    return total + ((item?.price || 0) * (item?.quantity || 0));
  }, 0);
  return (
    <div className="container  pb-20 pt-24 lg:pt-32  space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className=" bg-light-black rounded-2xl p-6 space-y-6">
        <div className="space-y-4">
          <h3 className=" text-main font-bold text-2xl">{c("title")}</h3>
          {items?.length > 0 && (
            <p className=" text-gray-400">
              {c("totalPrice")} <span className=" font-bold">{totalPrice.toFixed(2)} {t("currency")}</span>
            </p>
          )}
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" space-y-6">
            {!items?.length ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <BsCartX className="text-gray-400 text-6xl" />
                <h3 className="text-gray-400 text-xl font-semibold">{c("emptyCart")}</h3>
                <p className="text-gray-500">{c("emptyCartDesc")}</p>
              </div>
            ) : (
              items?.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  img={item.img}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
          <div>
            <CartForm />
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Cart;
