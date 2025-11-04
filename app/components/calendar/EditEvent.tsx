import { Event } from "@/lib/types/event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EVENT_TYPE_COLORS,
  capitalizeString,
  convert12HourTo24Hour,
  parseISOString,
} from "@/lib/event-utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { useEditUserEvent } from "@/convex/mutations";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITYLEVEL, Priority } from "@/lib/types/event";
type EditEventProps = {
  event: Event;
};

export default function EditEventForm({ event }: Readonly<EditEventProps>) {
  const [open, setOpen] = useState(false);

  const updateUserEvent = useEditUserEvent();
  const [formData, setFormData] = useState({
    type: event.type,
    name: event.event_name,
    eventDate: parseISOString(event.event_date),
    startTime: convert12HourTo24Hour(event.start_time),
    endTime: convert12HourTo24Hour(event.end_time),
    location: event.location,
    isRecurring: event.isRecurring,
    recurringPattern: event.recurringPattern,
    eventDesc: event.event_desc,
    priorityLevel: event.priority as "low" | "medium" | "high",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${formData.eventDate}T${formData.startTime}`,
    );
    const endDateTime = new Date(`${formData.eventDate}T${formData.endTime}`);

    updateUserEvent.mutate({
      id: event.id,
      type: formData.type,
      event_name: formData.name,
      event_date: new Date(formData.eventDate).toISOString(),
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location: formData.location,
      isRecurring: formData.isRecurring,
      recurring_pattern: formData.recurringPattern,
      event_desc: formData.eventDesc,
      priority: formData.priorityLevel,
    });
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          className="hover:cursor-pointer hover:text-background"
          size={20}
        />
      </DialogTrigger>
      <DialogContent className="max-w-md bg-background focus-primary">
        <DialogHeader>
          <DialogTitle>Update {event.event_name}</DialogTitle>
          <DialogDescription>Fill in the details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>

            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${EVENT_TYPE_COLORS[event.type].bg}`}
              ></div>
              <div>{capitalizeString(event.type)}</div>
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
                required
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
            <Label htmlFor="location">Location</Label>
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
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate">
                {capitalizeString(formData.type)} Description
              </Label>
            </div>
            <Textarea
              value={formData.eventDesc}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  eventDesc: e.target.value,
                })
              }
              placeholder="Enter description of event..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="recurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isRecurring: checked as boolean })
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
                  setFormData({ ...formData, recurringPattern: value })
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
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${EVENT_TYPE_COLORS[event.type].bg} hover:bg-primary hover:cursor-pointer`}
            >
              Update {capitalizeString(event.type)}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
