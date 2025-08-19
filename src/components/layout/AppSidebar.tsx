import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  TrendingUp, 
  CreditCard, 
  Receipt, 
  Users, 
  Building2, 
  BarChart3, 
  Calendar,
  Settings,
  LogOut,
  User,
  Menu,
  CreditCard as CardIcon,
  Plug
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { SubscriptionDialog } from "@/components/settings/SubscriptionDialog";

const mainItems = [
  { title: "Início", url: "/dashboard", icon: Home },
  { title: "Fluxo de Caixa", url: "/dashboard/fluxo-caixa", icon: TrendingUp },
  { title: "Contas", url: "/dashboard/contas", icon: CreditCard },
  { title: "Clientes", url: "/dashboard/clientes", icon: Users },
  { title: "Fornecedores", url: "/dashboard/fornecedores", icon: Building2 },
  { title: "Relatórios", url: "/dashboard/relatorios", icon: BarChart3 },
  { title: "Agenda", url: "/dashboard/agenda", icon: Calendar },
  { title: "Integrações", url: "/dashboard/integracoes", icon: Plug },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">DashComm</h1>
                <p className="text-xs text-sidebar-foreground/60">Gestão de E-commerce</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <div className="flex items-center gap-2 p-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-sidebar-foreground">{user?.user_metadata?.full_name || "Usuário"}</p>
                <p className="text-xs text-sidebar-foreground/60">{user?.email || "usuario@exemplo.com"}</p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-sidebar-accent transition-colors duration-200">
                  <Menu className="h-4 w-4 text-sidebar-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowSubscription(true)}>
                  <CardIcon className="mr-2 h-4 w-4" />
                  <span>Gerenciar assinatura</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarFooter>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      <SubscriptionDialog open={showSubscription} onOpenChange={setShowSubscription} />
    </Sidebar>
  );
}