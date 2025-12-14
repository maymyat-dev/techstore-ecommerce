import { ArrowRight, Repeat } from "lucide-react";
import { Button } from "./ui/button";

export default function TradeInSection() {
  return (
    <section className="w-full bg-primary py-5 rounded-md mt-20 mb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary/90 md:p-8 p-4 text-white md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-2 flex items-center gap-2 font-bold md:text-3xl text-2xl">
              <Repeat className="h-6 w-6" />
              Trade in your old device
            </h2>
            <p className="text-white/90">
              Get <span className="font-semibold">$200–$600</span> in credit when
              you trade in <span className="font-semibold">iPhone 11 or higher</span>.
            </p>
          </div>

          <Button className="group inline-flex items-center gap-2 rounded-sm bg-white px-5 py-1 font-medium text-primary transition hover:bg-white/90">
            Start Trade-In
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
