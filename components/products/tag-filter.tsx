"use client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

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
    if(tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
      {tags.map((t) => (
        <p
          key={t.id}
          className={cn(
            "px-2 py-1 border border-gray-300 rounded-sm cursor-pointer", 
            tagParams === t.tag && "bg-primary text-white"
          )}
          onClick={() => handleTagClick(t.tag)}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
};

export default TagFilter;
