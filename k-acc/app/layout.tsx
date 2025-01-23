import type { Metadata } from "next";
import "./globals.css";

import { Urbanist } from "next/font/google";
import { RouterProvider } from "./components/useRouter";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "glowyou",
  description:
    "Generate your perfect skincare routine based on your personal preferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} bg-background antialiased`}>
        <RouterProvider>
          <div className="items-center justify-center w-full h-screen max-w-[430px] mx-auto p-8">
            {children}
          </div>
        </RouterProvider>
      </body>
    </html>
  );
}
