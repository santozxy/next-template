import { Permission } from "@/domains/auth/enums";
import { getServerSession } from "@/lib/next-auth/auth";
import { hasPermission } from "@/utils/permissions";
import { ReactNode } from "react";

interface CanServerProps {
  permission: Permission | Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}

export async function CanServer({
  permission,
  children,
  fallback = null,
}: CanServerProps) {
  const session = await getServerSession();

  if (!session?.user) {
    return <>{fallback}</>;
  }

  const userPermissions = (session.user.permissions as Permission[]) || [];
  const permissionsArray = Array.isArray(permission)
    ? permission
    : [permission];

  const hasAccess = permissionsArray.every((p) =>
    hasPermission(userPermissions, p)
  );

  return <>{hasAccess ? children : fallback}</>;
}
