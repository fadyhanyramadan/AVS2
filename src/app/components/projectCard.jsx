import React from 'react'
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
function ProjectCard({header,disc,img,id}) {
    const t =useTranslations("projects")
  return (
        <Card className={"h-full py-0 overflow-hidden rounded-3xl bg-light-black border-0 group hover:bg-light-black/50 transition-all duration-300 "}>
           <Image className=" object-cover w-full rounded-t-3xl h-56 transform transition-transform duration-300 group-hover:scale-105" src={img} alt={header||"project"} width={500} height={500}/>

          <CardContent className={"space-y-8 pt-4 pb-8"}>
           <h2 className=" text-3xl font-bold text-main capitalize ">{header}</h2>
           <p className=" text-gray-400 text-sm leading-6 line-clamp-2 h-14"> {disc}</p>
           <Link href={`/projects/${id}`} className=" rounded-full px-4 py-2 bg-main hover:py-3 hover:px-5  text-white transition-all duration-300 ">{t("btn")}</Link>
          </CardContent>

        </Card>
  )
}

export default ProjectCard
