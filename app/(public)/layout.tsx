import { NavBar } from "@/app/(public)/_components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 bg-gray-200 justify-center items-center space-y-2 pt-4">
          Left Bar
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-green-100">
          {children}
        </div>
      </div>
    </>
  );
}
