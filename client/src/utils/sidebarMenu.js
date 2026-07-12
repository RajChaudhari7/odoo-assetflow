import {
  LayoutDashboard,
  Building2,
  Users,
  Tags,
  Boxes,
  ClipboardList,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: Building2,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    title: "Assets",
    path: "/assets",
    icon: Boxes,
  },
  {
    title: "Allocations",
    path: "/allocations",
    icon: ClipboardList,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
  },
  {
    title: "Maintenance",
    path: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Audits",
    path: "/audits",
    icon: ClipboardCheck,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: LogOut,
  },
];