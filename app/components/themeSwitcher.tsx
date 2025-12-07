"use client"
import { Sun, Moon, Flower2, Building2, CookingPot } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define your themes with a consistent structure
const themes = [
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

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(()=>{
    console.log("theme: ", theme)
  },[theme])


  if (!mounted) {
    return null;
  }

  return (

      <Select
        value={theme}
        onValueChange={(newThemeKey) => setTheme(newThemeKey)}
      >
        <SelectTrigger>
          <SelectValue  placeholder="theme">
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup
          >
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <SelectItem
                  value={t.key}
                  key={t.key}
                  aria-label={t.label}
                  className="px-2 hover:cursor-pointer flex flex-row"
                >
                <div className="flex flex-row gap-2">
                  <Icon className="h-[1.2rem] w-[1.2rem]" />
                  <span className="">{t.label}</span>
                </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>

      </Select>

  );
}
