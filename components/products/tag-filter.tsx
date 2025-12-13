"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const tags = [
  { id: 1, name: "iPhone", tag: "iphone" },
  { id: 2, name: "iPad", tag: "ipad" },
  { id: 3, name: "MacBook", tag: "macbook" },
  { id: 4, name: "iMac", tag: "imac" },
  { id: 5, name: "AirPods", tag: "airpods" },
];

const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

const handleTagClick = (tag: string) => {
  router.push(`?tag=${tag}`, {
    scroll: false,
  });
};

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {tags.map((t) => {
        const isActive = tagParams === t.tag;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTagClick(t.tag)}
            className={cn(
              "h-9 min-w-[96px] rounded-full px-5 text-sm font-medium transition-all",
              "border focus:outline-none focus:ring-2 focus:ring-primary/30",
              isActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-background text-foreground border-input hover:bg-accent"
            )}
          >
            {t.name}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
