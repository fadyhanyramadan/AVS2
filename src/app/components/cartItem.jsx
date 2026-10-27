"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import * as motion from "motion/react-client"; //server
import { useCartStore } from '@/stores/cart-store';
import { useTranslations } from 'next-intl';

function CartItem({ id, title, price, img, quantity }) {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCartStore();
  const t = useTranslations("singleProduct");
  const c = useTranslations("cart");
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8}}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className=' flex items-center   gap-4   border-b border-main p-4 bg-white rounded-2xl'>
      <div className=' flex items-center gap-6'>
        <Image src={img} alt={title} width={100} height={100} className='object-contain  size-26 shrink-0' />
      </div>


      <div className=' flex flex-col   gap-4  w-full'>
                <div className=' space-y-2 '>
          <h1 className=' font-bold line-clamp-1'>{title}</h1>
          <p className=' text-main'> <span className=' font-bold'>{Number(price).toFixed(2)} {t("currency")}</span> </p>
        </div>

        <div className='flex-col lg:flex-row flex lg:items-center gap-4'>

      <div className=' text-2xl flex items-center gap-4'>
        <button onClick={() => incrementQuantity(id)}>
          <CiSquarePlus className='text-main size-8 cursor-pointer hover:scale-110 transition-transform' />
        </button>
        <span className='font-bold'>{quantity}</span>
        <button onClick={() => decrementQuantity(id)}>
          <CiSquareMinus className='text-main size-8 cursor-pointer hover:scale-110 transition-transform' />
        </button>
      </div>
      <Button 
        onClick={() => removeFromCart(id)}
        className={'p-0  text-white border-none cursor-pointer flex items-center gap-2  hover:gap-3 transition-all duration-300 bg-main hover:bg-main'}>
        <MdDeleteForever className=' size-5 text-white'/>{c("remove")}
      </Button>
        </div>
      </div>

    </motion.div>
  )
}

export default CartItem
