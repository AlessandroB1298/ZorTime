import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditUserEvent } from "@/convex/mutations";
import { useCreateUserEvent, useGetUserEvent } from "@/convex/queries";
import {
  capitalizeString,
  convert12HourTo24Hour,
  parseISOString,
} from "@/lib/event-utils";
import {
  Event,
  EventType,
} from "@/lib/types/event";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useGetUserCourses } from "@/convex/queries";
import EventOnType from "./eventOnType";
import { GeneralEventType , SchoolSubtype} from "@/lib/types/event";
type eventFormProps = {
  id?: string;
  day?: string;
  editMode?: boolean;
  userId: string;
};

export default function FinalEventForm({
  day,
  id,
  editMode,
  userId,
}: eventFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  //fetch event via event id
  const { data, isLoading, isError, error } = useGetUserEvent(userId, id);

  const{data : courses, isLoading : loading, isError: gotError, error: error_} = useGetUserCourses(userId)

  const defaultEvent: Event = {
    id: "",
    created_by: "",
    type: "" as GeneralEventType | "school",
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
    schoolDetails : {
      schoolSubType : "assignment" as SchoolSubtype,
      course : "",
      assignmentDetails : {
        assignmentDueDate : "",
        assignmentName : ""
      }
    },

  };

  const [formData, setFormData] = useState<Event>(() => ({
    // Use defaults for every field initially
    ...defaultEvent,
  }));

  useEffect(() => {
    if (editMode && data ) {
      setFormData({
        id: data.id || "",
        created_by: data.created_by || "",
        type: data.type as GeneralEventType || defaultEvent.type ,
        event_name: data.event_name || "",

        // Use the fetched data for all complex conversions
        event_date: parseISOString(data.event_date),
        start_time: convert12HourTo24Hour(data.start_time),
        end_time: convert12HourTo24Hour(data.end_time),

        // Map the remaining simple fields
        location: data.location || "",
        isRecurring: data.isRecurring || false,
        recurringPattern:
          data.recurring_pattern || defaultEvent.recurringPattern,
        meetingUrl: data.meetingUrl || "",
        priority: data.priority || defaultEvent.priority,
        event_desc: data.event_desc || "",
        schoolDetails: {
          course : data.schoolDetails?.course ?? "",
          schoolSubType : data.schoolDetails?.schoolSubType as SchoolSubtype ?? "" as SchoolSubtype,
          assignmentDetails: {
            assignmentDueDate: data.schoolDetails?.assignmentDetails?.assginmentDueDate ?? "",
            assignmentName : data.schoolDetails?.assignmentDetails?.assignmentName ?? "",
          }
        }
      });
    }
  }, [data, editMode]);


  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  const renderName = (event : Event):string=>{
    if(event.type == "school"){
      switch(event.schoolDetails?.schoolSubType){
        case "assignment":
            if(event.schoolDetails.assignmentDetails){
                return event.schoolDetails.assignmentDetails?.assignmentName
            }
      }
    }

    return event.event_name
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editMode ? (
          <Pencil
            className="hover:cursor-pointer hover:text-background"
            size={20}
          />
        ) : (
          <Button className="gap-2">
            <Plus className="h-4 w-4 " />
            New Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" max-w-2xl  bg-background focus-primary">

        {editMode ? (
          <DialogHeader>
            <DialogTitle>Update {renderName(formData)}</DialogTitle>

            <DialogDescription>Fill in the details</DialogDescription>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>
              {formData.type === "work" || formData.type === "personal" ? (
                <div>
                  Create New {capitalizeString(formData.type)} Event
                </div>
              ) : (
                <div>Create New {capitalizeString(formData.type)}</div>
              )}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for your new event
            </DialogDescription>
            <Separator />
          </DialogHeader>
        )}

        <EventOnType
          event={formData}
          editMode={editMode}
          courses={courses}
          setOpen={setOpen}
          userId={userId}
          day={day}
        />
      </DialogContent>
    </Dialog>
  );
}
