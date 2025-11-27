import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";

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
            <div>
                {
                    value.map((tag, index) => (
                        <div key={index} className="inline-flex items-center bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2 mt-2">
                            <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2 mt-2">
                            {tag}
                        </span>
                        <XIcon className="cursor-pointer h-4 w-4" onClick={()=> handleOnChange(value.filter((_, i) => i !== index))}/>
                        </div>
                    ))
                }
            </div>
      </div>
    );
  }
);

export default TagsInput;
