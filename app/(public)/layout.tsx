import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-5 pb-10 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
