import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateUserEvent } from "@/convex/queries";
import { useUser } from "@clerk/nextjs";
import EventField from "../eventField";

type eventFormProps = {
  day?: string;
};

export default function EventForm({ day }: eventFormProps) {
  const { user, isLoaded } = useUser();
  const addNewUserEvent = useCreateUserEvent();
  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Event>({
    id: "",
    created_by: "",
    type: "meeting" as EventType,
    event_name: "",
    event_date: day?.split("T")[0] || "",
    start_time: "",
    end_time: "",
    location: "",
    isRecurring: false,
    recurringPattern: "weekly" as "daily" | "weekly" | "monthly",
    meetingUrl: "",
    priority: "low" as "low" | "medium" | "high",
    event_desc: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${formData.event_date}T${formData.start_time}`
    );
    const endDateTime = new Date(`${formData.event_date}T${formData.end_time}`);

    const eventDate = new Date(formData.event_date);

    if (user && isLoaded) {
      const event: Event = {
        event_desc: formData.event_desc,
        created_by: user.id,
        id: crypto.randomUUID(),
        type: formData.type,
        event_name: formData.event_name,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        event_date: eventDate.toISOString(),
        location: formData.location,
        isRecurring: formData.isRecurring,
        priority: formData.priority,
        meetingUrl: formData.meetingUrl,
        recurringPattern: formData.isRecurring
          ? formData.recurringPattern
          : undefined,
      };

      addNewUserEvent.mutate({
        id: event.id,
        created_by: event.created_by,
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
        event_date: event.event_date,
        event_desc: event.event_desc,
      });
    }

    setOpen(!open);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      created_by: "",
      event_desc: "",
      type: "meeting" as EventType,
      event_name: "",
      event_date: day || "",
      start_time: "",
      end_time: "",
      location: "",
      isRecurring: false,
      recurringPattern: "weekly" as "daily" | "weekly" | "monthly",
      meetingUrl: "",
      priority: "low" as "low" | "medium" | "high",
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

          {formData.type === "meeting" && (
            <EventField
              value={formData.meetingUrl}
              placeholder="https://meeting-link.com"
              type="url"
              stateName="meetingUrl"
              fieldName="Meeting URL"
              isRequired={true}
              prevFormData={formData}
              setFormData={setFormData}
            />
          )}

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
