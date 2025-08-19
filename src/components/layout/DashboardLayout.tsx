
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-14 border-b bg-white flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Dashboard FlowFront</h2>
            </div>
          </header>
          <main className="dashboard-content p-6">
            <div className="dashboard-spacing">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
