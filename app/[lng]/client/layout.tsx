import { languages } from "@/app/i18n/settings";
import { getT } from "@/app/i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata() {
  const { t } = await getT("translation");
  return {
    title: t("message.confirm"),
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-200 justify-center items-center space-y-2 pt-4 my-dark-style"></div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-green-100 my-dark-style">
        {children}
      </div>
    </>
  );
}
