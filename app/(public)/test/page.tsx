export default async function Page() {
  return (
    <>
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Left menu items"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 1"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 2"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 3"}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style">
        <div className="p-4 text-center space-y-6">
          <h1>{"(demo)"}</h1>
          <div className="my-2">---</div>
        </div>
      </div>
    </>
  );
}
