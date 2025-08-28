import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives/popover";
import { TAG_STYLES, TagStyle } from "@/features/tasks/constants";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { TaskTagColor } from "./task-tag-color";

export const ColorPicker = ({
  style,
  onStyleSelect,
  projectId,
}: {
  style: TagStyle;
  onStyleSelect: (style: TagStyle) => void;
  projectId: string;
}) => {
  const [selectedStyle, setSelectedStyle] = useState<TagStyle>(style); // default - blue
  const { id, ...selectedStyles } = selectedStyle;

  const handleColorChange = (style: TagStyle) => {
    setSelectedStyle(style);
    onStyleSelect(style);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="shadow-md hover:shadow-lg border-2 rounded-full w-8 h-8 transition-shadow duration-200"
          style={{ ...selectedStyles, filter: "brightness(1.2)" }}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-wrap justify-center items-center shadow-md p-4 overflow-hidden">
        <div className="flex flex-wrap gap-2">
          {TAG_STYLES.map((style) => (
            <PopoverClose asChild key={style.id}>
              <TaskTagColor
                tag={{
                  id: style.id,
                  name: style.id,
                  styleId: style.id,
                  projectId,
                }}
                onClick={() => handleColorChange(style)}
              />
            </PopoverClose>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
