"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Headphones,
} from "lucide-react";
import React from "react";

const tags = [
  { id: 1, name: "iPhone", tag: "iphone", icon: Smartphone },
  { id: 2, name: "iPad", tag: "ipad", icon: Tablet },
  { id: 3, name: "MacBook", tag: "macbook", icon: Laptop },
  { id: 4, name: "iMac", tag: "imac", icon: Monitor },
  { id: 5, name: "AirPods", tag: "airpods", icon: Headphones },
];

const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    router.push(`?tag=${tag}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tags.map((t) => {
        const isActive = tagParams === t.tag;
        const Icon = t.icon;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTagClick(t.tag)}
            className={cn(
              "flex items-center gap-2 h-9 min-w-[110px] rounded-full px-5 text-sm font-medium transition-all",
              "border focus:outline-none focus:ring-2 focus:ring-primary/30",
              isActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-background text-foreground border-input hover:bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            {t.name}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
