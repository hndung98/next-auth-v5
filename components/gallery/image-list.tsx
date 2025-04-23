import Image from "next/image";

type ImageItem = {
  src: string;
  alt?: string;
  title?: string;
};

export default function ImageGrid({
  images,
  columns = 3,
}: {
  images: ImageItem[];
  columns?: number;
}) {
  return (
    <div
      className={`
          grid gap-4
          ${columns === 1 ? "grid-cols-1" : ""}
          ${columns === 2 ? "grid-cols-2" : ""}
          ${columns === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : ""}
          ${columns > 3 ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}` : ""}
        `}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
        >
          <Image
            width={300}
            height={300}
            src={img.src}
            alt={img.alt || `image-${index}`}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          />
          {img.title && (
            <div className="p-2 text-sm text-gray-700">{img.title}</div>
          )}
        </div>
      ))}
    </div>
  );
}
