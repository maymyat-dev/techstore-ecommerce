"use client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const tags = [
  {
    id: 1,
    name: "iphone",
    tag: "iphone",
  },
  {
    id: 2,
    name: "ipad",
    tag: "ipad",
  },
  {
    id: 3,
    name: "macbook",
    tag: "macbook",
  },
  {
    id: 4,
    name: "imac",
    tag: "imac",
  },
  {
    id: 5,
    name: "airpods",
    tag: "airpods",
  },
];

const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 md:flex-1 flex-none justify-start">
      {tags.map((t) => (
        <button
          type="button"
          key={t.id}
          onClick={() => handleTagClick(t.tag)}
          className={cn(
            "px-4 rounded-sm border transition-colors",
            tagParams === t.tag
              ? "bg-primary text-primary-foreground border-primary"
              : "border-gray-300 text-foreground hover:bg-muted"
          )}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
