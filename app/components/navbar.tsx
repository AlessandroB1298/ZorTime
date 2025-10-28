"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants/narbarItems";
import { Hourglass } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

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
          <Link href="/" className="text-xl font-extrabold text-foreground">
            Zortime
          </Link>
        </div>
        <ul className="flex flex-row items-center justify-end gap-8">
          {navItems.map((item, index) => (
            <li key={index + 1}>
              <Link
                className="hover:text-primary hover:cursor-pointer"
                href={item.link}
              >
                {item.title}{" "}
              </Link>
            </li>
          ))}
          <div>
            <Link href={"/sign-up"}>
              <Button
                variant={"default"}
                className="hover:bg-muted-foreground hover:cursor-pointer"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};
