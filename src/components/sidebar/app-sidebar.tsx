import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Nav } from "./nav";
import { images } from "@/assets/images";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { permissions } = session.user;

  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border flex h-16 justify-center border-b">
        <div className="flex items-center justify-center gap-6 px-2">
          <Image src={images.logo} alt="Logo" width={180} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Nav permissions={permissions} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
