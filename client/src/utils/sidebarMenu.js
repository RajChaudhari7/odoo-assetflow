import {
  LayoutDashboard,
  Building2,
  Users,
  Tags,
  Boxes,
  ClipboardList,
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
];