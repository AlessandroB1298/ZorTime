import { Bell, Bot, Calendar, LucideProps, Notebook } from "lucide-react";

export type productType = {
  productTitle: String;
  productIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  productImage: String;
  productDesc: String;
};

export const productItems: productType[] = [
  {
    productTitle: "Calendar",
    productIcon: Calendar,
    productImage: "blur",
    productDesc: "All-in-one calendar for managing and planning.",
  },
  {
    productTitle: "Journal",
    productIcon: Notebook,
    productImage: "blur",
    productDesc: "Beautiful collection of markdown notebooks for everyday use.",
  },
  {
    productTitle: "Ai Summaries",
    productIcon: Bot,
    productImage: "blur",
    productDesc: "Helpful Ai summary bot to help you stay on track",
  },

  {
    productTitle: "Reminders",
    productIcon: Bell,
    productImage: "blur",
    productDesc: "Helpful Ai summary bot to help you stay on track",
  },
];
