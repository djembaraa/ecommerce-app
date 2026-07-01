import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MegaMart - Your Ultimate Ecommerce Destination",
  description: "Shop the best products at MegaMart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}>
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
