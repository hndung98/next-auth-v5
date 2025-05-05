import ImageGrid from "@/components/gallery/image-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

const images = [
  { src: "https://picsum.photos/id/1/400/300", title: "picsum 1" },
  { src: "https://picsum.photos/id/2/400/300", title: "picsum 2" },
  { src: "https://picsum.photos/id/3/400/300", title: "picsum 3" },
  { src: "https://picsum.photos/id/4/400/300", title: "picsum 4" },
  { src: "https://picsum.photos/id/5/400/300", title: "picsum 5" },
  { src: "https://picsum.photos/id/6/400/300", title: "picsum 6" },
  { src: "https://picsum.photos/id/7/400/300", title: "picsum 7" },
  { src: "https://picsum.photos/id/8/400/300", title: "picsum 8" },
  { src: "https://picsum.photos/id/9/400/300", title: "picsum 9" },
  { src: "https://picsum.photos/id/10/400/300", title: "picsum 10" },
];

export default async function Page() {
  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-100 justify-center items-center space-y-2 pt-2 my-dark-style">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-gray-100 my-dark-style">
        <ImageGrid images={images} columns={3} />
      </div>
    </>
  );
}
