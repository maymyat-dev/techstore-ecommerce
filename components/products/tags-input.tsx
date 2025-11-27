import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { X, XIcon } from "lucide-react";

type TagsInputProps = {
  value: string[];
  handleOnChange: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value, handleOnChange, ...props }, ref) => {
    const [tagData, setTagData] = useState("");

    const addNewTag = () => {
      if (tagData) {
        const newTagsData = new Set([...value, tagData]);
        handleOnChange(Array.from(newTagsData));
        setTagData("");
      }
    };
    return (
      <div>
        <Input
                placeholder="Enter to save"
                onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNewTag();
          }
        }}
          value={tagData}
          {...props}
          onChange={(e) => setTagData(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              <span>{tag}</span>
              <X
                className="ml-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500 transition"
                onClick={() =>
                  handleOnChange(value.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default TagsInput;
