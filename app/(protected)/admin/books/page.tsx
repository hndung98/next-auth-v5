import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Books",
};

export default async function Page() {
  return <h3>Books</h3>;
}
