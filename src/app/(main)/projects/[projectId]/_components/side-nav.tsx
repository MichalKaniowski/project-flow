"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/primitives/tooltip";
import { cn } from "@/lib/utils";
import { Book, ChevronLeft, ChevronRight, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";

export const NavItems = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1) {
    segments.pop();
  }

  const basePath = `/${segments.join("/")}`;

  return [
    {
      name: "Home",
      href: `${basePath}/tasks`,
      icon: <Home size={20} />,
      active: pathname === `${basePath}/tasks`,
      position: "top",
    },
    {
      name: "Plan",
      href: `${basePath}/plan`,
      icon: <Book size={20} />,
      active: pathname === `${basePath}/plan`,
      position: "top",
    },
    {
      name: "Project Settings",
      href: `${basePath}/project-settings`,
      icon: <Settings size={20} />,
      active: pathname === `${basePath}/project-settings`,
      position: "bottom",
    },
  ];
};

export const SideNav = () => {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      if (saved === null) {
        return true;
      }
      return JSON.parse(saved);
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="pr-4">
      <div
        className={cn(
          isSidebarExpanded ? "w-[200px]" : "w-[68px]",
          "border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full"
        )}
      >
        <aside className="flex flex-col columns-1 px-4 w-full h-full overflow-x-hidden break-words">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
          <div className="block bottom-0 sticky mt-auto mb-4 whitespace-nowrap transition duration-200">
            {navItems.map((item, idx) => {
              if (item.position === "bottom") {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="right-[-12px] bottom-32 absolute flex justify-center items-center bg-accent shadow-md hover:shadow-lg border border-muted-foreground/20 rounded-full w-6 h-6 transition-shadow duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className="stroke-foreground" />
            ) : (
              <ChevronRight size={16} className="stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const SideNavItem: React.FC<{
  label: string;
  icon: ReactNode;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`h-full w-full  relative flex items-center whitespace-nowrap rounded-md ${
            active
              ? "font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
              : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          }`}
        >
          <div
            className={cn(
              "relative flex flex-row items-center space-x-2 px-2 py-1.5 rounded-md w-full font-base text-sm duration-100",
              active && "bg-foreground/5"
            )}
          >
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? "font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white"
                    : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <div className="relative flex flex-row items-center space-x-2 p-2 rounded-md font-base text-sm duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="px-3 py-1.5 text-xs"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
