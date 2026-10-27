"use client"

import { FaPhone } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { useTranslations } from "next-intl";
import { useSiteSettings } from "@/stores/site-setting";
import Header from "./header";

export default function ProjectInfo() {
  const s = useTranslations('contact')
  const t = useTranslations('projectInfoHeader')
  const { siteSettings } = useSiteSettings();
  return (
    <div>
      <div className="space-y-6 mb-20">

     <h3 className="text-2xl font-bold text-main">{t('title')}</h3>
     <p className="text-white lg:text-4xl text-2xl md:text-3xl ">{t('disc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="flex gap-4 items-center">

          <div className="flex gap-4 items-center">

            <FaPhone className="text-main text-3xl" />
            <div>
              <h3 className=" capitalize font-bold text-lg text-main">
                {s("contactPhone")}
              </h3>
              <p className="text-gray-400"> {siteSettings?.phone_contact}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaPhone className="text-main text-3xl" />
          <div>
            <h3 className=" capitalize font-bold text-lg text-main">
              {s("contactProject")}
            </h3>
            <p className="text-gray-400 font-light">{siteSettings?.phone_project}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaPhone className="text-main text-3xl" />
          <div>
            <h3 className=" capitalize font-bold text-lg text-main">
              {s("contactOrder")}
            </h3>
            <p className="text-gray-400 font-light">{siteSettings?.phone_order}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <TbWorld className="text-main text-3xl" />
          <div>
            <h3 className=" capitalize font-bold text-lg text-main">
              {s("website")}
            </h3>
            <p className="text-gray-400 font-light">AVS.org.com</p>
          </div>
        </div>

      </div>
    </div>

  )
}