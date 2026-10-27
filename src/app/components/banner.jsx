import React from 'react'
import * as motion from "motion/react-client"; //server

function Banner({title}) {
  return (
    <motion.div
       initial={{opacity:0,y:30}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
    className='bg-no-repeat bg-cover  xl:h-[40vh] h-[20vh] ' style={{ backgroundImage: "url('/banner.png')" }}>
      <div className=' bg-black/60 h-full '>
        <div className='container h-full  flex items-center max-md:justify-center'>
          <h2 className='xl:text-6xl md:text-5xl text-4xl font-bold text-main '>{title}</h2>
        </div>
      </div>
    </motion.div>
  )
}

export default Banner
