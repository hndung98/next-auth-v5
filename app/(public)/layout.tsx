import { PublicFooter } from "@/components/common/footer";
import { NavBar } from "@/components/common/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 mb-1">
        <NavBar showLogin />
      </div>
      <main className="">{children}</main>
      <PublicFooter />
    </div>
  );
}
