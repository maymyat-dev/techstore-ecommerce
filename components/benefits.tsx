import { ShieldCheck, Truck } from "lucide-react";
import { FcOnlineSupport } from "react-icons/fc";

const benefits = [
  {
    icon: Truck,
    title: "Free Delivery",
    description:
      "Get your products delivered straight to your doorstep at no extra cost.",
  },
  {
    icon: ShieldCheck,
    title: "AppleCare+",
    description:
      "Shop with confidence using our comprehensive AppleCare+ protection plans.",
  },
  {
    icon: FcOnlineSupport,
    title: "24/7 Support",
    description:
      "Our friendly support team is always available to help you anytime.",
  },
];

export default function WhyShopWithUsSection() {
  return (
    <section className="w-full md:mb-20 mb-10">
      <div className="">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            The <span className="text-primary">TechStore</span> Difference
          </h2>

          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Why you should shop with us
          </p>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="group rounded-sm bg-white dark:bg-gray-800 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
