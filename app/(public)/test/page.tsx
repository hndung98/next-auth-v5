import { FetchButton } from "./test-button";

export default async function Page() {
  return (
    <>
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Choose level..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Top 5 highest scores..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Advertising..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Something else..."}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style">
        <div className="p-4 text-center space-y-6">
          <h1>{"(Test)"}</h1>
          <div>
            <FetchButton text="fetch customers" apiUrl="/api/customers" />
          </div>
          <div>
            <FetchButton
              text="fetch customer 123"
              apiUrl="/api/customers/123456"
            />
          </div>
        </div>
      </div>
    </>
  );
}
