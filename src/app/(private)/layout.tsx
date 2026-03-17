import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "@/components/sidebar/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col overflow-hidden">
        <Header />
        <div className="flex flex-col gap-6 p-8">{children}</div>
      </div>
    </SidebarProvider>
  );
}
