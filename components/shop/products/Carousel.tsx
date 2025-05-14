import { ProductElement } from "@/components/shop/products/ProductElement";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductElementType } from "@/types/product";

export function ProductCarousel({
  products,
}: {
  products: ProductElementType[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-screen"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem
            key={`related-product-${index}`}
            className="md:basis-1/3 lg:basis-1/4 max-w-lg w-full mx-auto"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {/* <span className="text-3xl font-semibold">{idx + 1}</span> */}
                  <ProductElement
                    key={product.id}
                    product={product}
                    priority={index < 2}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/4 max-w-lg w-full mx-auto"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
