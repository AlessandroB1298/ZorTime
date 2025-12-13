import {
  Bell,
  Bot,
  Calendar,
  FolderKanban,
  LucideProps,
  Notebook,
} from "lucide-react";
import calendar from "@/app/assets/calendar.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
export type productType = {
  productTitle: string;
  productIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  productImage: string | StaticImport;
  productDesc: string;
};

export const productItems: productType[] = [
  {
    productTitle: "Calendar",
    productIcon: Calendar,
    productImage: calendar,
    productDesc: "All-in-one calendar for managing and planning.",
  },
  {
    productTitle: "Journal",
    productIcon: Notebook,
    productImage: calendar,
    productDesc: "Beautiful collection of markdown notebooks for everyday use.",
  },
  {
    productTitle: "Project Planner",
    productIcon: FolderKanban,
    productImage: calendar,
    productDesc:
      "Using Kanban style planning boards, to maximize  time management.",
  },

  {
    productTitle: "Reminders",
    productIcon: Bell,
    productImage: calendar,
    productDesc: "Helpful Ai summary bot to help you stay on track",
  },
];
