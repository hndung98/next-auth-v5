import { NavBar } from "./_components/navbar";

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
          <h3 className="text-center">Menu Item 1</h3>
          <h3 className="text-center">Menu Item 2</h3>
          <h3 className="text-center">Menu Item 3</h3>
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-green-100">
          {children}
        </div>
      </div>
    </>
  );
}
