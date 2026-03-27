import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <h1 className="absolute text-9xl font-bold dark:text-white/5 text-[#4b008217] select-none">
        404
      </h1>
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Oops! That page is{" "}
          <span className="text-primary bg-clip-text">missing.</span>
        </h2>
        <p className="mt-4">
          We couldn’t find the page you were looking for, <br/>but you can always
          head back to the store.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button className="flex items-center gap-2">
              <HomeIcon size={18} />
              Back to Home
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border border-primary text-primary"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
