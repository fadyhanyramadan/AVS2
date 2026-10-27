import Image from 'next/image';
import Link from 'next/link';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const SideBar = ({ other,page }) => {
  return (
    <div className=' space-y-6'>
      {other?.map((item, idx) => (
        <article key={idx} className='flex items-center gap-4'>
          <figure className=' size-32 relative flex-shrink-0 rounded-md overflow-hidden'>
            <Image src={item?.image[0]} alt={item?.title} fill className="  object-cover  " />
          </figure>
          <div className='space-y-2'>
            <h3 className='font-bold  line-clamp-2 text-white'>{item?.title}</h3>
            <p className='text-sm text-gray-400 line-clamp-3 '>
              {item?.description} </p>
            <Link href={`/${page}/${item?.id}`} className='text-main flex items-center  gap-2 font-bold capitalize hover:gap-3 hover:text-white transition-all duration-300 '>
              learn more <MdKeyboardDoubleArrowRight size={20} />
            </Link>
          </div>
        </article>

      ))}

    </div>
  )
}

export default SideBar