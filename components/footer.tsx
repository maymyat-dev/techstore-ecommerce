import React from "react";
import Link from "next/link";
import { AppleIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-slate-800 border-t  border-t-slate-60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center">
              <AppleIcon className="mr-2" size={30} fill="black" />
              <span className="font-bold text-lg text-neutral-900 dark:text-white">
                TechStore
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed opacity-70">
              Premium technology products crafted with performance, precision,
              and modern design in mind.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Support</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <Link href="/help" className="transition hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support" className="transition hover:text-primary">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="transition hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <Link href="/about" className="transition hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col  items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} TechStore. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm opacity-70">
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
