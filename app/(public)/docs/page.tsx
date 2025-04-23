import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
};

export default async function Page() {
  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-100 justify-center items-center space-y-2 pt-4">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-gray-100">
        <h3>Docs</h3>
      </div>
    </>
  );
}
