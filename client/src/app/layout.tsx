import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Crave Cart",
  description: "Your gateway to gourmet cravings delivered with a click.",
};

import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="px-5 w-full flex justify-center">
          <div className="max-w-6xl">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
