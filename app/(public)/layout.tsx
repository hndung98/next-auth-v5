import { NavBar } from "@/components/common/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50 mb-1">
        <NavBar showLogin />
      </div>
      <div className="flex h-screen flex-col md:flex-row">{children}</div>
    </>
  );
}
