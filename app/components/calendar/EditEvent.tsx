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
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { useEditUserEvent } from "@/convex/mutations";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITYLEVEL, Priority } from "@/lib/types/event";
import EventField from "../eventField";
import { Separator } from "@/components/ui/separator";

type EditEventProps = {
  event: Event;
};

export default function EditEventForm({ event }: Readonly<EditEventProps>) {
  const [open, setOpen] = useState(false);

  const updateUserEvent = useEditUserEvent();
  const [formData, setFormData] = useState<Event>({
    created_by: event.created_by,
    type: event.type,
    id: event.id,
    event_name: event.event_name,
    event_date: parseISOString(event.event_date),
    start_time: convert12HourTo24Hour(event.start_time),
    end_time: convert12HourTo24Hour(event.end_time),
    location: event.location,
    isRecurring: event.isRecurring,
    recurringPattern: event.recurringPattern,
    event_desc: event.event_desc,
    priority: event.priority as "low" | "medium" | "high",
    meetingUrl: event.meetingUrl,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${formData.event_date}T${formData.start_time}`
    );
    const endDateTime = new Date(`${formData.event_date}T${formData.end_time}`);

    updateUserEvent.mutate({
      id: event.id,
      type: formData.type,
      event_name: formData.event_name,
      event_date: new Date(formData.event_date).toISOString(),
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location: formData.location,
      isRecurring: formData.isRecurring,
      recurring_pattern: formData.recurringPattern,
      event_desc: formData.event_desc,
      priority: formData.priority,
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

          <EventField
            value={formData.event_name}
            fieldName="Event Name"
            stateName="event_name"
            prevFormData={formData}
            isRequired={true}
            setFormData={setFormData}
            placeholder="team meeting"
          />

          <Separator />
          <div className={"space-y-2"}>
            <h3 className={"flex text-sm opacity-65"}>Date and Time</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <EventField
              value={formData.event_date}
              fieldName="Date"
              setFormData={setFormData}
              prevFormData={formData}
              isRequired={true}
              type="date"
              stateName="event_date"
            />
            <EventField
              value={formData.start_time}
              fieldName="Start Time"
              setFormData={setFormData}
              prevFormData={formData}
              isRequired={true}
              type="time"
              stateName="start_time"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <EventField
              value={formData.end_time}
              fieldName="End Time"
              setFormData={setFormData}
              prevFormData={formData}
              isRequired={true}
              type="time"
              stateName="end_time"
            />
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
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: value as Priority,
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

          <EventField
            value={formData.location}
            fieldName="Location"
            stateName={"location"}
            prevFormData={formData}
            isRequired={false}
            setFormData={setFormData}
            placeholder="Conference Room A"
          />

          <EventField
            value={formData.event_desc}
            fieldName={capitalizeString(formData.type) + " Description"}
            setFormData={setFormData}
            prevFormData={formData}
            stateName={"event_desc"}
            placeholder="Enter description of event..."
            AlternativeComponent={Textarea}
          />

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
