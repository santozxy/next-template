"use client";

import { Permission } from "@/domains/auth/enums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { getAccessibleNavItems } from "./helpers";

interface NavProps {
  permissions: Permission[];
}

export function Nav({ permissions }: NavProps) {
  const pathname = usePathname();
  const nav = getAccessibleNavItems(permissions);

  return (
    <SidebarMenu className="flex flex-col gap-2 p-3">
      {nav.map((item) => (
        <SidebarMenuItem key={item.href} className="flex items-center">
          <SidebarMenuButton asChild className="">
            <Link
              prefetch={true}
              href={item.href}
              className={`flex items-center gap-3 flex-row rounded-lg py-2 text-muted-foreground hover:bg-secondary/50 
                      ${
                        pathname === item.href
                          ? "bg-secondary/50 text-primary font-medium"
                          : ""
                      }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
