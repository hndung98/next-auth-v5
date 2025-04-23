import { NavBar } from "@/app/(protected)/_components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        {children}
      </div>
    </>
  );
}
