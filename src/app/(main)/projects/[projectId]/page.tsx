"use client";

import { redirect, usePathname } from "next/navigation";

export default function ProjectPage() {
  const pathname = usePathname();

  redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}/tasks`);
}
