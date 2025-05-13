import { Header } from "@/components/shop/nav/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header channel={"test"} />
      <div className="flex min-h-[calc(100dvh-64px)] flex-col">
        <main className="flex-1">{children}</main>
        {/* <Footer channel={channel} /> */}
      </div>
    </>
  );
}
