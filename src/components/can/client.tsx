"use client";

import { Permission } from "@/domains/auth/enums";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface CanProps {
  permission: Permission | Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function CanClient({ permission, children, fallback = null }: CanProps) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const userPermissions = (session?.user?.permissions as Permission[]) || [];

  const permissionsArray = Array.isArray(permission)
    ? permission
    : [permission];

  const hasAccess = permissionsArray.every((p) =>
    hasPermission(userPermissions, p)
  );

  return <>{hasAccess ? children : fallback}</>;
}
