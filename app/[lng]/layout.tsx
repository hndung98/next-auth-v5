import { NavBar } from "@/components/common/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar showLogin />
      </div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden my-dark-style">
        {children}
      </div>
    </>
  );
}
