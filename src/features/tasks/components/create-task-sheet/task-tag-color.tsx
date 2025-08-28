import { Tag } from "@/generated/prisma";
import { TAG_STYLES } from "../../constants";

const getTagStyle = (tag: Tag) => {
  // Simple hash function to consistently assign colors
  let hash = 0;
  for (let i = 0; i < tag.name.length; i++) {
    const char = tag.name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return TAG_STYLES[Math.abs(hash) % TAG_STYLES.length];
};

export const TaskTagColor = ({
  tag,
  onClick,
}: {
  tag: Tag;
  onClick: () => void;
}) => {
  // const { background, borderColor, textColor, shadowColor } = getTagStyle(tag);
  const style = getTagStyle(tag);

  return (
    <span
      className="shadow-md hover:shadow-lg border-2 rounded-full w-8 h-8 transition-shadow duration-200 cursor-pointer"
      // style={{ ...style, filter: "brightness(2)" }}
      style={{
        background: style.background,
        borderColor: style.borderColor,
        boxShadow: style.shadowColor,
      }}
      onClick={onClick}
    />
  );
  // return (
  //   <span
  //     className={`inline-flex items-center text-xs font-medium rounded-full ${textColor}
  //       transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg cursor-pointer
  //       relative overflow-hidden bg-${borderColor} w-[30px] h-[30px]`}
  //     style={{
  //       background: `linear-gradient(135deg, ${background}, rgba(255, 255, 255, 0.02))`,
  //       backdropFilter: "blur(16px) saturate(180%)",
  //       WebkitBackdropFilter: "blur(16px) saturate(180%)",
  //       border: `1px solid ${borderColor}`,
  //       boxShadow: `
  //         0 2px 8px -2px ${shadowColor},
  //         0 4px 16px -4px rgba(0, 0, 0, 0.05),
  //         inset 0 1px 0 rgba(255, 255, 255, 0.1),
  //         inset 0 -1px 0 rgba(0, 0, 0, 0.05)
  //       `,
  //       filter: "brightness(1.3)",
  //       // ...style,
  //     }}
  //     onClick={onClick}
  //   >
  //     {/* <span
  //       className="absolute inset-0 !opacity-100 rounded-full"
  //       style={{
  //         background:
  //           "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
  //         filter: "brightness(1.1)",
  //       }}
  //     /> */}
  //     {/* <span className="z-10 relative !opacity-100 w-[30px] h-[30px]"></span> */}
  //   </span>
  // );
};
