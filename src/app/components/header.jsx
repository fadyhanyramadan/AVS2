import React from "react";
import * as motion from "motion/react-client"; //server

function Header({ title, disc ,align="text-start"}) {
  const [first, ...rest] = disc.split(" ");
  return (
    <div

    className={` space-y-2 max-md:text-center  ${align}`}>
      <motion.p 
             initial={{opacity:0 ,y:-20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:1}}
      className=" capitalize text-main font-bold">{title}</motion.p>
      <motion.h2
                   initial={{opacity:0 ,y:-20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:1,delay:0.5}}
      className="lg:text-5xl text-3xl md:text-4xl text-white font-extralight capitalize">
        <span className="font-bold">{first}</span> {rest.join(" ")}
      </motion.h2>
    </div>
  );
}

export default Header;
