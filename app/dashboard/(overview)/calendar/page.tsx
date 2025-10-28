"use client";
import { CalendarHeader } from "@/app/components/calendar/calendarHeader";
import EventForm from "@/app/components/calendar/eventForm";
import { CalendarView } from "@/lib/types/event";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import CalendarViewContainer from "@/app/components/calendar/viewContainers/CalendarViewContainer";
import AgendaViewContainer from "@/app/components/calendar/viewContainers/AgendaViewContainer";

export default function Page() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>("month");
    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    const handleNavigate = (direction: "prev" | "next" | "today") => {
        if (direction === "today") {
            setCurrentDate(new Date());
            return;
        }

        const newDate = new Date(currentDate);

        if (view === "today") {
            newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        } else if (view === "month" || view === "agenda") {
            newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        }

        setCurrentDate(newDate);
    };

    const renderView = () => {
        switch (view) {
            case "month":
                return (
                    <CalendarViewContainer userId={user.id} currentDate={currentDate} />
                );
            case "agenda":
                return (
                    <AgendaViewContainer userId={user.id} currentDate={currentDate} />
                );
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <CalendarHeader
                        currentDate={currentDate}
                        view={view}
                        onViewChange={setView}
                        onNavigate={handleNavigate}
                    />
                    <EventForm />
                </div>

                <div className="mt-6">{renderView()}</div>
            </div>
        </div>
    );
}
