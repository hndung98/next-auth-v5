import NavLinks from "@/components/chat/nav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 my-dark-style">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
