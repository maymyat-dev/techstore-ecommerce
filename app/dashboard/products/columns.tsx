"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, CirclePlus, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { VariantsWithImageTags } from "@/lib/infer-types";
import VariantDialog from "@/components/products/variant-dialog";
import { Badge } from "@/components/ui/badge";

export type Product = {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
  variants: VariantsWithImageTags[];
};

const ActionsCell = (row: Row<Product>) => {
  const product = row.original;

  const { execute } = useAction(deleteProduct, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Link
            href={`/dashboard/create-product?edit_id=${product.id}`}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500 flex items-center gap-2"
          onClick={() => execute({ id: product.id })}
        >
          <Trash2 className="h-4 w-4 text-red-500 " />
          Delete Product
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Eye className="h-4 w-4" />
          View product details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageSrc = row.getValue("image") as string;
      const title = row.getValue("title") as string;
      return (
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-md border">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImageTags[];

      return <div className="flex items-center gap-2 flex-wrap">
          {variants.map((v) => (
            <VariantDialog
              key={v.id}
              editMode={true}
              variant={v}
              productId={row.original.id}
            >
              <div
                className="w-6 h-6 rounded-full border shadow-sm cursor-pointer hover:scale-105 transition"
                style={{ backgroundColor: v.color }}
              ></div>
            </VariantDialog>
          ))}

          <VariantDialog editMode={false} productId={row.original.id}>
            <CirclePlus className="w-5 h-5 text-gray-400 hover:text-black hover:scale-110 transition cursor-pointer" />
          </VariantDialog>
        </div>
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div
          className="font-medium overflow-hidden
whitespace-nowrap
text-ellipsis
max-w-[350px]"
        >
          {row.getValue("title") as string}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-bold text-green-500">{formatted}</div>;
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionsCell {...row} />;
    },
  },
];
