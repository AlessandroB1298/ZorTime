"use client";
import ThemeSwitcher from "./themeSwitcher";

export default function TopBanner() {
  return (
    <div className="m-2">
      <div className="flex gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
