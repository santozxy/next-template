import { Permission } from "@/domains/auth/enums";
import { hasPermission } from "@/utils/permissions";
import {
  LayoutDashboard,
  Users
} from "lucide-react";

export const identifierLinks: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/users": "Usuários",
  "/users/create": "Adicionar usuário",
  "/users/[id]/update": "Editar usuário",
};

export interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  requiredPermissions: Permission[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/dashboard",
    requiredPermissions: [],
  },

  {
    title: "Usuários",
    icon: <Users />,
    href: "/users",
    requiredPermissions: [],
  },
];

export function getAccessibleNavItems(userPermissions: Permission[]) {
  if (userPermissions.includes(Permission.all)) return navItems;

  return navItems.filter(
    (item) =>
      item.requiredPermissions.length === 0 ||
      item.requiredPermissions.some((perm) =>
        hasPermission(userPermissions, perm),
      ),
  );
}
