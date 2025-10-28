import React, { useState, useEffect } from "react";
import {
  EventType,
  PRIORITYLEVEL,
  Event,
  ReccuringType,
  Priority,
} from "@/lib/types/event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeString, EVENT_TYPE_COLORS } from "@/lib/event-utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateUserEvent } from "@/convex/queries";
import { useUser } from "@clerk/nextjs";

export default function EventForm() {
  const { user, isLoaded } = useUser();
  const addNewUserEvent = useCreateUserEvent();
  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    createdBy: "",
    type: "meeting" as EventType,
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    isRecurring: false,
    recurringPattern: "weekly" as "daily" | "weekly" | "monthly",
    meetingLink: "",
    priorityLevel: "" as "low" | "medium" | "high",
  });

  useEffect(() => {
    console.log(`Start Time: ${formData.startTime}`);
    console.log(`End time: ${formData.endTime}`);
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`,
    );
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (user && isLoaded) {
      const event: Event = {
        created_by: user.id,
        id: crypto.randomUUID(),
        type: formData.type,
        event_name: formData.name,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        location: formData.location,
        isRecurring: formData.isRecurring,
        priority: formData.priorityLevel,
        meetingUrl: formData.meetingLink,
        recurringPattern: formData.isRecurring
          ? formData.recurringPattern
          : undefined,
      };

      addNewUserEvent.mutate({
        created_by: event.created_by,
        id: event.id,
        type: event.type,
        event_name: event.event_name,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        isRecurring: event.isRecurring,
        recurring_pattern: event.recurringPattern,
        priority: event.priority,
        meetingUrl: event.meetingUrl,
        meetingTime: event.meetingTime,
        start_date: event.start_date,
        end_date: event.end_date,
      });
    }

    setOpen(!open);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      createdBy: "",
      type: "meeting" as EventType,
      name: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      isRecurring: false,
      recurringPattern: "weekly" as "daily" | "weekly" | "monthly",
      meetingLink: "",
      priorityLevel: "" as "low" | "medium" | "high",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-background focus-primary">
        <DialogHeader>
          <DialogTitle>
            {formData.type === "work" || formData.type === "personal" ? (
              <div>Create New {capitalizeString(formData.type)} Event</div>
            ) : (
              <div>Create New {capitalizeString(formData.type)}</div>
            )}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your new event
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <form onSubmit={handleSubmit} className={"space-y-4"}>
          <div className={"space-y-2"}>
            <Label htmlFor="type">Event Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as EventType })
              }
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EVENT_TYPE_COLORS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${value.bg}`} />
                      {value.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Team meeting"
              required
            />
          </div>
          <Separator />
          <div className={"space-y-2"}>
            <h3 className={"flex text-sm opacity-65"}>Date and Time</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="startDate">Start Date</Label>
              </div>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="endDate">End Date</Label>
              </div>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
              />
            </div>
          </div>
          <Separator />

          <div className={"space-y-2"}>
            <h3 className={"flex text-sm opacity-65"}>
              {capitalizeString(formData.type)} Details
            </h3>
          </div>
          {formData.type === "task" && (
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priorityLevel}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priorityLevel: value as Priority,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITYLEVEL).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${value.bg}`} />
                        {capitalizeString(value.label)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <div className={"flex items-center gap-2"}>
              <Label htmlFor="location">Location</Label>
            </div>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Conference Room A"
            />
          </div>

          <div className="space-y-2">
            {formData.type === "meeting" && (
              <div>
                <Label htmlFor="startTime">Meeting Link</Label>
                <Input
                  id="meetingLink"
                  type="url"
                  placeholder={"https://meeting-link.com"}
                  value={formData.meetingLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meetingLink: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate">
                {capitalizeString(formData.type)} Description
              </Label>
            </div>
            <Textarea placeholder="Enter description of event..." />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="recurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    isRecurring: checked as boolean,
                  })
                }
              />
              <Label htmlFor="recurring" className="cursor-pointer">
                Recurring event
              </Label>
            </div>

            {formData.isRecurring && (
              <Select
                value={formData.recurringPattern}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    recurringPattern: value as ReccuringType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant={"default"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={EVENT_TYPE_COLORS[formData.type].bg}
              type="submit"
            >
              Create {capitalizeString(formData.type)} Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
