import { NavLinks } from "@/components/music/NavLinks";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full md:flex">
        <div className="w-full flex-none md:w-64 bg-gray-100 my-dark-style justify-center items-center space-y-2 pt-2 my-dark-style">
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          </div>
        </div>
        <div className="flex-grow p-4 min-h-screen md:overflow-y-auto md:p-6 bg-gray-100 my-dark-style">
          <main className="">{children}</main>
        </div>
      </div>
    </>
  );
}
