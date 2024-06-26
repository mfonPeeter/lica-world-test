import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppProvider from "@/context/app-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lica World Test",
  description: "Take home assignment by Lica World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <AppProvider>
          <body className={inter.className}>{children}</body>
        </AppProvider>
      </html>
    </ClerkProvider>
  );
}
