import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "sonner";
import "./globals.css";
import AppNav from "@/components/navigation/app-nav";
import { AuthProvider } from "@/components/auth-provider";
import AdminNav from "@/components/navigation/admin-nav";
import NextTopLoader from 'nextjs-toploader';
import AiChat from "@/components/chat/ai-chart";

export const metadata: Metadata = {
  title: "TechStore",
  description: "Our shop has the latest modern i-devices",
  openGraph: {
    images: ['/images/og-image.png'],
  }
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
          <AuthProvider>
            <NextTopLoader color="#8E51FF" showSpinner={false} />
            <AdminNav/>
            <AppNav/>
            
            <main>
              {children}
            </main>
            {/* <AiChat /> */}
            <Toaster position="top-center" richColors closeButton />
            </AuthProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
