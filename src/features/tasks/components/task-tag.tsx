import { Tag } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { TAG_STYLES } from "../constants";

export const TaskTag = ({
  tag,
  isHighlighted,
}: {
  tag: Tag;
  isHighlighted: boolean;
}) => {
  const { background, borderColor, textColor, shadowColor } =
    TAG_STYLES.find((style) => style.id === tag.styleId) || TAG_STYLES[0];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${textColor} transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl cursor-pointer relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${background}, rgba(255, 255, 255, 0.02))`,
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: `1px solid ${borderColor}`,
        boxShadow: `
          0 2px 8px -2px ${shadowColor},
          0 4px 16px -4px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
      }}
    >
      <span
        className="absolute inset-0 opacity-30 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
          filter: isHighlighted ? "brightness(1.1)" : "none",
        }}
      />
      <span
        className={cn(
          "z-10 relative",
          isHighlighted ? "opacity-100" : "opacity-60"
        )}
      >
        {tag.name}
      </span>
    </span>
  );
};
