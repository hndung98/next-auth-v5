export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-200 justify-center items-center space-y-2 pt-4 my-dark-style"></div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-green-100 my-dark-style">
        {children}
      </div>
    </>
  );
}
