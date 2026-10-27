import React from "react";
import ProductCard from "./productCard";

function FilterGrid({ data, locale = "en" }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {(data ?? []).map((item, index) => (
        <ProductCard key={item?.id} index={index} id={item?.id} price={item?.price} title={item?.name} disc={item?.description} img={item?.image[0]} discount={item?.discount_percentage} price_after_discount={item?.price_after_discount} quantity={item?.quantity} />
      ))}
    </div>
  );
}

export default FilterGrid;
