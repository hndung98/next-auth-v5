import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Authors",
};

export default async function Page() {
  return <h3>Authors</h3>;
}
