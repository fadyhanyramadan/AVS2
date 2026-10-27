"use client"
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getData } from '@/api/fetch-data';
function FaqClient() {
  const [data, setData] = useState([]);
  async function getFaqData() {
    const res =await  getData({ url: "/faqs" });
    if (res?.code == 200) {
      setData(res?.data?.data);
    } else {
      setData([]);
    }
  }
  useEffect(() => {
    getFaqData();
  }, []);
  return (
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full md:w-[80%] md:mx-auto space-y-6 " >
      {data?.map((item, idx) => (
        <AccordionItem value={`item-${idx + 1}`} key={idx} className="border-b-0">
          <AccordionTrigger className={"cursor-pointer"}>{item.question}</AccordionTrigger>
          <AccordionContent className={'bg-light-black p-5 rounded-2xl'}>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>

  )
}

export default FaqClient
