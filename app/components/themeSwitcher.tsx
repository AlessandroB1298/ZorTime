import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // shadcn/ui Tabs components

// Define your themes with a consistent structure
const themes = [
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tabs
      value={theme}
      onValueChange={(newThemeKey) => setTheme(newThemeKey)}
      className="w-fit"
    >
      <TabsList className="grid w-full grid-cols-2">
        {themes.map((t) => {
          const Icon = t.icon;
          return (
            <TabsTrigger
              key={t.key}
              value={t.key}
              aria-label={t.label}
              className="px-2 hover:cursor-pointer"
            >
              <Icon className="h-[1.2rem] w-[1.2rem]" />
              {/* Optional: Add a tooltip or visually hidden text for the label */}
              <span className="sr-only">{t.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
