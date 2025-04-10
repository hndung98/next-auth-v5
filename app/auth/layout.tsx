import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Authentication",
    default: "Authentication",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center bg-radial-[at_0%_25%] from-sky-300 via-blue-500 to-indigo-900 to-90%">
      {children}
    </div>
  );
}
