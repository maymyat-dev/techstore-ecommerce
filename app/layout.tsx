import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "sonner";
import "./globals.css";
import AppNav from "@/components/navigation/app-nav";

export const metadata: Metadata = {
  title: "MayMyatMon TechStore",
  description: "Our shop has the latest modern i-devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppNav/>
           <main className="max-w-7xl mx-auto px-5 pb-10"> 
            {children}
          </main>
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
