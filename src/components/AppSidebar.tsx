import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  Contact,
  Clock,
  Bell,
  HelpCircle,
  UserCircle,
  Settings,
  Shield,
  CreditCard,
  TrendingUp,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
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

const navSections = [
  {
    label: "Dashboards",
    items: [
      { title: "Sales Pipeline", url: "/", icon: LayoutDashboard },
      { title: "Lead Conversion", url: "/lead-conversion", icon: TrendingUp },
    ],
  },
  {
    label: "Applications",
    items: [
      { title: "Kanban Board", url: "/kanban", icon: KanbanSquare },
      { title: "Contacts", url: "/contacts", icon: Contact },
      { title: "Timeline", url: "/timeline", icon: Clock },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Team", url: "/team", icon: Users },
      { title: "FAQ", url: "/faq", icon: HelpCircle },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: UserCircle },
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Security", url: "/security", icon: Shield },
      { title: "Billing", url: "/billing", icon: CreditCard },
    ],
  },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className="px-4 pb-4 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-base tracking-tight text-foreground"
            >
              Apex CRM
            </motion.span>
          )}
        </div>

        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground/60 px-4">
              {!collapsed && section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={`group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`}
                          activeClassName=""
                        >
                          {active && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
