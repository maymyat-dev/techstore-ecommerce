"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Headphones,
  Watch,
} from "lucide-react";
import React from "react";

const tags = [
  { id: 1, name: "iPhone", tag: "iphone", icon: Smartphone },
  { id: 2, name: "iPad", tag: "ipad", icon: Tablet },
  { id: 3, name: "MacBook", tag: "macbook", icon: Laptop },
  { id: 4, name: "iMac", tag: "imac", icon: Monitor },
  { id: 5, name: "AirPods", tag: "airpods", icon: Headphones },
  { id: 6, name: "iWatch", tag: "iwatch", icon: Watch },
];

const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    router.push(`?tag=${tag}`, { scroll: false });
  };

  return (
   <div className="flex w-full gap-4 overflow-x-auto pb-2 md:w-2/3 md:flex-wrap md:overflow-visible">
  {tags.map((t) => {
    const isActive = tagParams === t.tag;
    const Icon = t.icon;

    return (
      <button
        key={t.id}
        type="button"
        onClick={() => handleTagClick(t.tag)}
        className={cn(
          "flex shrink-0 items-center gap-2",
          "h-10 px-4 rounded-sm text-sm font-medium",
          "border transition-colors",
          isActive
            ? "bg-primary text-primary-foreground border-primary"
            : "dark:bg-gray-800 text-foreground border-border"
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
