"use client";

import FilterGrid from "@/app/components/filterGrid";
import FilterPannel from "@/app/components/filterPannel";
import Header from "@/app/components/header";
import { getData } from "@/api/fetch-data";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductsPageClient({
  initialData,
  initialPagination,
  initialBrands,
  initialCategories,
}) {
  const t = useTranslations("productHeader");
  const locale = useLocale();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ category_id: "", brand_id: "" });
  const [pagination, setPagination] = useState(initialPagination);
  const [isInitialMount, setIsInitialMount] = useState(true);

  const fetchFilteredProducts = async (page = 1) => {
    setLoading(true);
    const url = `/products-filter?category_id=${filters.category_id}&brand_id=${filters.brand_id}&page=${page}`;
    const res = await getData({ url, cache: "no-store" });
    if (res.code === 200) {
      setData(res?.data?.data || []);
      setPagination({
        currentPage: res.data?.pagination?.currentPage,
        lastPage: res.data?.pagination?.lastPage,
        perPage: res.data?.pagination?.perPage,
        total: res.data?.pagination?.total,
      });
    } else {
      setData([]);
      setPagination({
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0,
      });
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      fetchFilteredProducts(newPage);
    }
  };

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    fetchFilteredProducts();
  }, [filters]);

  return (
    <div className="container pb-20 pt-24 lg:pt-32 space-y-12">
      <Header title={t("title")} disc={t("disc")} align="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-[20%_80%] gap-6">
        <div>
          <FilterPannel
            filters={filters}
            setFilters={setFilters}
            initialBrands={initialBrands}
            initialCategories={initialCategories}
          />
        </div>
        <div>
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <FilterGrid data={data} locale={locale} />
                {pagination?.lastPage > 1 && (
                  <div
                    className={`flex justify-center mt-8 gap-4 ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <button
                      onClick={() =>
                        handlePageChange(pagination?.currentPage - 1)
                      }
                      disabled={pagination?.currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-main"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        handlePageChange(pagination?.currentPage + 1)
                      }
                      disabled={
                        pagination?.currentPage === pagination?.lastPage
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-main"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPageClient;
