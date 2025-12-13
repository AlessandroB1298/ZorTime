import { Building2, CookingPot, Flower2, Moon, Sun } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
type themeType = {
  key: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
};

export const themes: themeType[] = [
  {
    key: "light",
    icon: Sun,
    label: "Light",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark",
  },
  {
    key: "citynights",
    icon: Building2,
    label: "City Nights",
  },
  {
    key: "lavender",
    icon: Flower2,
    label: "Lavender",
  },
  {
    key: "raos",
    icon: CookingPot,
    label: "Raos",
  },
];
