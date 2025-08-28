export interface TagStyle {
  id: string;
  background: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
}
export const TAG_STYLES: TagStyle[] = [
  {
    id: "0",
    background: "rgba(59, 130, 246, 0.08)",
    borderColor: "rgba(59, 130, 246, 0.15)",
    textColor: "text-blue-700 dark:text-blue-300",
    shadowColor: "rgba(59, 130, 246, 0.1)",
  }, // Blue
  {
    id: "1",
    background: "rgba(147, 51, 234, 0.08)",
    borderColor: "rgba(147, 51, 234, 0.15)",
    textColor: "text-purple-700 dark:text-purple-300",
    shadowColor: "rgba(147, 51, 234, 0.1)",
  }, // Purple
  {
    id: "2",
    background: "rgba(236, 72, 153, 0.08)",
    borderColor: "rgba(236, 72, 153, 0.15)",
    textColor: "text-pink-700 dark:text-pink-300",
    shadowColor: "rgba(236, 72, 153, 0.1)",
  }, // Pink
  {
    id: "3",
    background: "rgba(99, 102, 241, 0.08)",
    borderColor: "rgba(99, 102, 241, 0.15)",
    textColor: "text-indigo-700 dark:text-indigo-300",
    shadowColor: "rgba(99, 102, 241, 0.1)",
  }, // Indigo
  {
    id: "4",
    background: "rgba(6, 182, 212, 0.08)",
    borderColor: "rgba(6, 182, 212, 0.15)",
    textColor: "text-cyan-700 dark:text-cyan-300",
    shadowColor: "rgba(6, 182, 212, 0.1)",
  }, // Cyan
  {
    id: "5",
    background: "rgba(20, 184, 166, 0.08)",
    borderColor: "rgba(20, 184, 166, 0.15)",
    textColor: "text-teal-700 dark:text-teal-300",
    shadowColor: "rgba(20, 184, 166, 0.1)",
  }, // Teal
  {
    id: "6",
    background: "rgba(100, 116, 139, 0.08)",
    borderColor: "rgba(100, 116, 139, 0.15)",
    textColor: "text-slate-700 dark:text-slate-300",
    shadowColor: "rgba(100, 116, 139, 0.1)",
  }, // Slate
  {
    id: "7",
    background: "rgba(249, 115, 22, 0.08)",
    borderColor: "rgba(249, 115, 22, 0.15)",
    textColor: "text-orange-700 dark:text-orange-300",
    shadowColor: "rgba(249, 115, 22, 0.1)",
  }, // Orange
];
