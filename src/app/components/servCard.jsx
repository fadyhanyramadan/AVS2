import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { GoArrowUpRight } from "react-icons/go";

function ServCard({id,header,disc,img}) {
  return (
        <div
             className="h-full  rounded-3xl bg-light-black border-2 border-transparent  hover:border-main  transition-all duration-300 p-8 space-y-8">
            <Image alt={header} src={img} width={60} height={60} className='size-16  object-contain rounded-full bg-white'/>
            <h3 className=' text-xl text-white '>{header}</h3>
            <p className=' text-gray-400 leading-7 line-clamp-3 '>{disc}</p>
            <Link href={`/services/${id}`} className='  rounded-full size-14 bg-black hover:bg-main transition-all duration-300 flex  items-center justify-center'><GoArrowUpRight className=' text-xl text-white'/></Link>
        </div>
  )
}

export default ServCard
