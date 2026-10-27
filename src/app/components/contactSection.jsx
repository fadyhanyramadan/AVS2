"use client"
import React from "react";
import ContactForm from "./contactForm";
import Header from "./header";
import { useTranslations } from "next-intl";
import { FaPhone } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import * as motion from "motion/react-client"; //server
import { useSiteSettings } from "@/stores/site-setting";


function ContactSection() {
      const { siteSettings } = useSiteSettings();
  
  const t = useTranslations("contactHeader");
    const s = useTranslations("contact");
  
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
      <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0}}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="space-y-10">
        <Header title={t("title")} disc={t("disc")} />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
 
           <div className="flex gap-4 items-center">
             
             <div className="space-y-2">
               <div className="flex items-center gap-2">
                 <FaPhone className="text-main text-3xl" />
               <h3 className=" capitalize font-bold text-lg text-main">
                 {s("phone")}  
               </h3>
               </div>
               <p className="text-gray-400"><span className="text-white"> {s("contactPhone")} :</span> {siteSettings?.phone_contact}</p>
               <p className="text-gray-400"><span className="text-white"> {s("contactOrder")} :</span> {siteSettings?.phone_order}</p>
               <p className="text-gray-400"><span className="text-white"> {s("contactProject")} :</span> {siteSettings?.phone_project}</p>
             </div>
           </div>
           <div className="flex gap-4 items-center">
             <TbWorld className="text-main text-3xl" />
             <div>
               <h3 className=" capitalize font-bold text-lg text-main">
                 {s("website")}
               </h3>
               <p className="text-gray-400 font-light">avs-eg.com</p>
             </div>
           </div>
  
           </div>
      </motion.div>


      <motion.div
            initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0}}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      >
        <ContactForm />
      </motion.div>
    </div>
  );
}

export default ContactSection;
