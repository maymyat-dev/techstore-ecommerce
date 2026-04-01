import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function SupportComingSoon() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <h1 className="absolute text-[12rem] font-bold dark:text-white/5 text-[#4b008210] select-none uppercase">
        Coming
      </h1>
      
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          This Page is <br/>
          <span className="text-primary bg-clip-text">Coming Soon.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          We're currently building this page. <br/>
          Please check back later.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button className="flex items-center gap-2 rounded-full px-8">
              <HomeIcon size={18} />
              Back to Home
            </Button>
          </Link>
          
          <Button variant="outline" className="border-primary text-primary rounded-full px-8">
            Notify Me
          </Button>
        </div>
      </div>
    </div>
  );
}