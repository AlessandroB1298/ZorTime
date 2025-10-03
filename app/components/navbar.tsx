"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants/narbarItems";
import { Calendar, Hourglass } from "lucide-react";
import { useTheme } from "next-themes";

export const NavbarComponent = () => {
  const { theme } = useTheme();
  return (
    <nav className="bg-transparent">
      <div className="flex justify-between p-4 bg-transparent ">
        <div className="flex flex-row gap-2 ">
          {theme === "light" ? (
            <Hourglass color="#c1121f" />
          ) : (
            <Hourglass color="#669bbc" />
          )}
          <a href="/" className="text-xl font-extrabold text-foreground">
            Zortime
          </a>
        </div>
        <ul className="flex flex-row items-center justify-end gap-8">
          {navItems.map((item, index) => (
            <li key={index + 1}>
              <a
                className="hover:text-primary hover:cursor-pointer"
                href={item.link}
              >
                {item.title}{" "}
              </a>
            </li>
          ))}
          <div>
            <Button
              variant={"default"}
              className="hover:bg-muted-foreground hover:cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
        </ul>
      </div>
    </nav>
  );
};
