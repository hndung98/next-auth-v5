import { Metadata } from "next";

import { ProductList } from "@/components/shop/products/ProductList";
import { getProducts } from "@/data/product";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="w-full md:flex">
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Categories"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Something here..."}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style">
        <div className="p-4 text-center space-y-6 min-h-screen">
          <h1>{"(Results for your search...)"}</h1>
          <div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
