"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getData } from "@/api/fetch-data";

const Counter = () => {
  const t = useTranslations("counter");
  const [counterData, setCounterData] = useState({
    projects: 0,
    years: 0,
    clients: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const getCounter = async () => {
    try {
      const res = await getData({ url: '/heroes' });
      if (res?.code === 200 && res?.data?.data) {
        setCounterData({
          projects: res?.data?.data?.project_completed || 0,
          years: res?.data?.data?.years_of_experience || 0,
          clients: res?.data?.data?.clients_worldwide || 0
        });
      }
    } catch (error) {
      console.error('Error fetching counter data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCounter();
  }, []);

  if (isLoading) {
    return (
      <div className="container px-16 py-8 flex items-center justify-center gap-8 text-main">
        {[1, 2, 3].map((_, index) => (
          <div 
            key={index}
            className="text-center capitalize space-y-4 bg-light-black p-4 lg:p-14 rounded-3xl font-bold border border-main/20 w-full max-w-xs"
          >
            <p className="text-white md:text-4xl">0</p>
            <p className="text-xs md:text-lg">Loading...</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container px-16 py-8 flex items-center justify-center gap-8 text-main"
    >
      <CounterItem 
        value={counterData?.projects} 
        label={t("projects")} 
        delay={0.2} 
      />
      <CounterItem 
        value={counterData?.years} 
        label={t("years")} 
        delay={0.4} 
      />
      <CounterItem 
        value={counterData?.clients} 
        label={t("clients")} 
        delay={0.6} 
      />
    </motion.div>
  );
};

const CounterItem = ({ value = 0, label, duration = 2000, delay }) => {
  const [count, setCount] = useState(0);
 


  // console.log(data)

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16); // update every ~16ms (60fps)

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className="text-center  capitalize space-y-4  bg-light-black p-4 lg:p-14 rounded-3xl font-bold border border-main/20 "
    >
      <p className="text-white  md:text-4xl">
        {count}
        {value === 25 || value === 75 ? "+" : ""}
      </p>
      <p className=" text-xs md:text-lg">{label}</p>
    </motion.div>
  );
};


export default Counter;
