import { Calendar, Home, LucideProps, Notebook, Settings } from "lucide-react";

export type sideNavItem = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const items: sideNavItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },

  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Journal",
    url: "/dashboard/journal",
    icon: Notebook,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
