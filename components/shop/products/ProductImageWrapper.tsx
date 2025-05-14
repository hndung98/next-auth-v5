import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
  return (
    <div className="aspect-square overflow-hidden bg-neutral-50">
      <NextImage
        {...props}
        className="h-full w-full object-contain object-center p-2 hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};
