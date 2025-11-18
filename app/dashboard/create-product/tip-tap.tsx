"use client";

import { Toggle } from "@radix-ui/react-toggle";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Undo2,
  Redo2,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

type TiptapProps = {
  field: string;
};

const INPUT_BASE_CLASSES =
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-auto min-h-[160px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const INPUT_FOCUS_CLASSES = "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const INPUT_INVALID_CLASSES =
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";


const EDITOR_WRAPPER_CLASSES = `${INPUT_BASE_CLASSES} ${INPUT_FOCUS_CLASSES} ${INPUT_INVALID_CLASSES}`;


const TOOLBAR_BUTTON_CLASSES =
  "p-2 rounded-md transition-colors hover:bg-gray-200 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600";
const ICON_CLASSES = "w-4 h-4";

const Tiptap = ({ field }: TiptapProps) => {
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
    ],
    content: field,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: EDITOR_WRAPPER_CLASSES,
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue(field, content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  return (
    <div className="space-y-2">

      {editor && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 p-2 border border-gray-200 rounded-md">
        
          <div className="flex items-center gap-1 border-r pr-2 border-gray-200">
            <Toggle
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className={TOOLBAR_BUTTON_CLASSES}
              title="Bold"
            >
              <Bold className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Italic"
            >
              <Italic className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              pressed={editor.isActive("strike")}
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Strikethrough"
            >
              <Strikethrough className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              pressed={editor.isActive("code")}
              onPressedChange={() => editor.chain().focus().toggleCode().run()}
              className={TOOLBAR_BUTTON_CLASSES}
              title="Code"
            >
              <Code className={ICON_CLASSES} />
            </Toggle>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 border-gray-200">
            <Toggle
              pressed={editor.isActive("bulletList")}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Bullet List"
            >
              <List className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              pressed={editor.isActive("orderedList")}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Ordered List"
            >
              <ListOrdered className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              pressed={editor.isActive("blockquote")}
              onPressedChange={() =>
                editor.chain().focus().toggleBlockquote().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Blockquote"
            >
              <Quote className={ICON_CLASSES} />
            </Toggle>
          </div>

    
          <div className="flex items-center gap-1 border-r pr-2 border-gray-200">
            <Toggle
              pressed={editor.isActive("heading", { level: 1 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Heading 1"
            >
              <Heading1 className={ICON_CLASSES} />
            </Toggle>
            <Toggle
              pressed={editor.isActive("heading", { level: 2 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Heading 2"
            >
              <Heading2 className={ICON_CLASSES} />
            </Toggle>
            <Toggle
              pressed={editor.isActive("heading", { level: 3 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Heading 3"
            >
              <Heading3 className={ICON_CLASSES} />
            </Toggle>
          </div>

 
          <div className="flex items-center gap-1">
            <Toggle
              onPressedChange={() =>
                editor.chain().focus().setHorizontalRule().run()
              }
              className={TOOLBAR_BUTTON_CLASSES}
              title="Horizontal Rule"
            >
              <Minus className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              onPressedChange={() => editor.chain().focus().undo().run()}
              className={TOOLBAR_BUTTON_CLASSES}
              title="Undo"
            >
              <Undo2 className={ICON_CLASSES} />
            </Toggle>

            <Toggle
              onPressedChange={() => editor.chain().focus().redo().run()}
              className={TOOLBAR_BUTTON_CLASSES}
              title="Redo"
            >
              <Redo2 className={ICON_CLASSES} />
            </Toggle>
          </div>
        </div>
      )}

      <div
        className="
          prose prose-sm max-w-none 
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-800
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-700
          [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-gray-600
          [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:border-blue-400 [&_blockquote]:text-gray-600 [&_blockquote]:italic
          [&_code]:bg-gray-100 [&_code]:p-1 [&_code]:rounded
        "
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;