import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Merriweather } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/navigation/Navbar";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stakk",
  description: "Stakk your perfect skin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background ${outfit.variable} ${merriweather.variable} font-outfit antialiased flex`}
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen w-full">
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
