"use client";

import { VariantSchema } from "@/types/variant-schema";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import { cn } from "@/lib/utils";
import { X, Loader2 } from "lucide-react";

const VariantImages = () => {
  const { control, getValues, setError } =
    useFormContext<z.infer<typeof VariantSchema>>();

  const [isUploading, setIsUploading] = useState(false);

  const [pendingFileNames, setPendingFileNames] = useState<string[]>([]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variantImage",
  });

  return (
    <div>
      <FormField
        control={control}
        name="variantImage"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Upload Images
            </FormLabel>
            <FormDescription>
              Upload up to <b>10 images</b>. Drag & drop supported.
            </FormDescription>

            <FormControl>
              <UploadDropzone
                endpoint="variantImageUploader"
                disabled={isUploading || fields.length >= 10}
                className={cn(
                  "border border-dashed rounded-xl p-5 bg-muted/30 transition",
                  (isUploading || fields.length >= 10) &&
                    "opacity-60 pointer-events-none",
                  "hover:bg-muted/50",
                  "ut-allowed-content:text-primary",
                  "ut-label:text-primary",
                  "ut-upload-icon:text-primary/60",
                  "ut-button:bg-primary"
                )}
                onBeforeUploadBegin={(files) => {
                  const currentCount = getValues("variantImage").length;
                  if (currentCount + files.length > 10) {
                    setError("variantImage", {
                      message: "You can upload up to 10 images only.",
                    });
                    return [];
                  }

                  setIsUploading(true);
                  setPendingFileNames(files.map((f) => f.name));

                  files.forEach((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                      loading: true,
                    });
                  });

                  return files;
                }}
                onUploadError={(error) => {
                  setIsUploading(false);

                  const stored = getValues("variantImage");
                  for (let i = stored.length - 1; i >= 0; i--) {
                    if (
                      stored[i].loading &&
                      pendingFileNames.includes(stored[i].name)
                    ) {
                      remove(i);
                    }
                  }

                  setPendingFileNames([]);

                  setError("variantImage", {
                    type: "manual",
                    message: `Upload failed: ${error.message}. Please check your network and try again.`,
                  });
                }}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  setPendingFileNames([]);

                  const stored = getValues("variantImage");

                  stored.forEach((img, index) => {
                    if (img.url.startsWith("blob:")) {
                      const uploaded = res.find(
                        (item) => item.name === img.name
                      );

                      if (uploaded) {
                        update(index, {
                          url: uploaded.url,
                          name: uploaded.name,
                          size: uploaded.size,
                          key: uploaded.key,
                          loading: false,
                        });
                      }
                    }
                  });
                }}
                config={{ mode: "auto" }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-lg overflow-hidden border shadow-sm group animate-fadeIn"
          >
            {field.loading ? (
              <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            ) : (
              <img
                src={field.url}
                alt={field.name}
                className="w-full h-20 object-cover transition-opacity duration-300"
              />
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-black z-10"
              disabled={field.loading}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>

      {isUploading && (
        <div className="flex items-center text-primary text-sm gap-2 mt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Uploading...
        </div>
      )}
    </div>
  );
};

export default VariantImages;
