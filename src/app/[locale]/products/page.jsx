import { getData } from "@/api/fetch-data";
import ProductsPageClient from "@/app/components/productsPageClient";

async function ProductsPage() {
  const [productsRes, brandsRes, categoriesRes] = await Promise.all([
    getData({ url: "/products-filter?category_id=&brand_id=&page=1" }),
    getData({ url: "/brands" }),
    getData({ url: "/categories" }),
  ]);

  const initialData =
    productsRes.code === 200 ? productsRes?.data?.data || [] : [];
  const initialPagination =
    productsRes.code === 200
      ? {
          currentPage: productsRes.data?.pagination?.currentPage ?? 1,
          lastPage: productsRes.data?.pagination?.lastPage ?? 1,
          perPage: productsRes.data?.pagination?.perPage ?? 10,
          total: productsRes.data?.pagination?.total ?? 0,
        }
      : { currentPage: 1, lastPage: 1, perPage: 10, total: 0 };
  const initialBrands =
    brandsRes.code === 200 ? brandsRes?.data?.data || [] : [];
  const initialCategories =
    categoriesRes.code === 200 ? categoriesRes?.data?.data || [] : [];

  return (
    <ProductsPageClient
      initialData={initialData}
      initialPagination={initialPagination}
      initialBrands={initialBrands}
      initialCategories={initialCategories}
    />
  );
}

export default ProductsPage;
