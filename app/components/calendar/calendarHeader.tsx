"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalendarView } from "@/lib/types/event";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onNavigate,
}: Readonly<CalendarHeaderProps>) {
  const getHeaderText = () => {
    const options: Intl.DateTimeFormatOptions =
      view === "month"
        ? { month: "long", year: "numeric" }
        : view === "week"
          ? { month: "short", day: "numeric", year: "numeric" }
          : { month: "long", day: "numeric", year: "numeric" };

    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {" "}
          {getHeaderText()}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("today")}
            className="min-w-[80px]"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-lg font-medium text-muted-foreground ">View</span>
      </div>

      <div className="ml-2">
        <Select
          value={view}
          onValueChange={(v) => onViewChange(v as CalendarView)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="agenda">Agenda</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
