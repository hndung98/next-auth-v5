import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Hasagi",
    default: "Hasagi",
  },
  description: "The Nextjs project using Authjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
