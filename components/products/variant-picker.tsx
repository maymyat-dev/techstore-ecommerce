"use client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

type VariantPickerProps = {
  id: number;
  color: string;
  productType: string;
  title: string;
  price: number;
  productId: number;
  image: string;
};
const variantPicker = ({
  id,
  color,
  productType,
  title,
  price,
  productId,
  image,
}: VariantPickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedVariantColor = searchParams.get("type") || productType;
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() =>
              router.push(
                `/products/${id}?productId=${productId}&type=${productType}&image=${image}&title=${title}&price=${price}`,
                { scroll: false }
              )
            }
            style={{ backgroundColor: color }}
            className={cn(
              "w-8 h-8 rounded-full cursor-pointer",
              selectedVariantColor === productType
                ? "ring-2 ring-primary ring-offset-2 scale-110"
                : "opacity-90 border border-gray-200"
            )}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{productType}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default variantPicker;
