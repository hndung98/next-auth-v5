import Link from "next/link";

export default async function Page() {
  return (
    <div className="w-full md:flex">
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Search..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 1"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 2"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 3"}
          </div>
        </div>
        <div className="mt-4 p-4 text-center space-y-6 min-h-screen">
          <div>
            <Link href={"/shop/products"}>All Products</Link>
          </div>
          <div>
            <Link href={"/shop/categories"}>All Categories</Link>
          </div>
          <div>
            <Link href={"/shop/orders"}>Your Orders</Link>
          </div>
          <div>
            <Link href={"/shop/cart"}>Your Cart</Link>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style"></div>
    </div>
  );
}
