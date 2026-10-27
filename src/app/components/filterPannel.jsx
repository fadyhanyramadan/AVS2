"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import * as motion from "motion/react-client";
import { getData } from "@/api/fetch-data";
import { useTranslations } from "next-intl";

function FilterPannel({
  filters,
  setFilters,
  initialBrands = [],
  initialCategories = [],
}) {
  const t = useTranslations("singleProduct");
  const [brands, setBrands] = useState(initialBrands);
  const [categories, setCategories] = useState(initialCategories);
  const handleCategoryChange = (category_id) => {
    setFilters((prev) => ({
      ...prev,
      category_id: prev.category_id === category_id ? "" : category_id,
    }));
  };

  const handleBrandChange = (brand_id) => {
    setFilters((prev) => ({
      ...prev,
      brand_id: prev.brand_id === brand_id ? "" : brand_id,
    }));
  };

  async function getBrands(){
    const res = await getData({url:'/brands'});
 
    
    if(res.code==200){
      setBrands(res?.data?.data);
    }else{
      setBrands([]);
    }
  }
  async function getCategories(){
    const res = await getData({url:'/categories'});
 
    if(res.code==200){
      setCategories(res?.data?.data);
    }else{
      setCategories([]);
    }
  }

  useEffect(() => {
    if (initialBrands.length === 0) getBrands();
    if (initialCategories.length === 0) getCategories();
  }, []);

  const clearFilters = () => {
    setFilters({ category_id: "", brand_id: "" });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className=" bg-light-black rounded-2xl p-4 space-y-6"
    >
      <div className="flex items-center justify-between">
        <p className=" text-main font-bold">{t("filter")}</p>
        <Button
          onClick={clearFilters}
          className=" cursor-pointer text-main flex items-center gap-2 border-none hover:gap-3 transition-all duration-300 bg-transparent hover:bg-transparent"
        >
          <RiDeleteBin6Fill />
          {t("delete")}
        </Button>
      </div>
      <div className=" space-y-4">
        <div className=" space-y-4 bg-black rounded-2xl p-4">
          <h3 className=" text-main font-bold">{t("categories")}</h3>
          {categories?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Checkbox
                checked={filters.category_id === item.id}
                onCheckedChange={() => handleCategoryChange(item.id)}
               id={item?.id}
                className={" border border-white"}
              />
              <Label htmlFor={`category-${idx+1}`} className={"text-white"}>
                {item?.title}
              </Label>
            </div>
          ))}
        </div>
        <div className=" space-y-4 bg-black rounded-2xl p-4">
          <h3 className=" text-main font-bold">{t("brands")}</h3>
          {brands?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Checkbox
              id={item?.id}
                checked={filters.brand_id === item.id}
                onCheckedChange={() => handleBrandChange(item.id)}
                className={" border border-white"}
              />
              <Label htmlFor={`brand-${idx+1}`} className={"text-white"}>
                {item?.title}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FilterPannel;
