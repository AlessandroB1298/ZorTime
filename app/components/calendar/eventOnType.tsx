import { Event, EventType, GeneralEventType, ReccuringType, SchoolSubtype, PRIORITYLEVEL, Priority, ExamKey, AssignmentKey} from "@/lib/types/event"
import { capitalizeString, EVENT_TYPE_COLORS, formattedDate, SCHOOL_SUB_TYPES } from "@/lib/event-utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EventField from "../eventField";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { useEditUserEvent } from "@/convex/mutations";
import { useCreateUserEvent, useGetUserCourses } from "@/convex/queries";

type EventTypeProps = {
  event : Event,
  editMode : boolean | undefined
  setOpen : React.Dispatch<SetStateAction<boolean>>
  userId : string,
  day : string | undefined,
}

export default function EventOnType({ event, editMode, setOpen,userId,day}: EventTypeProps){
  const{data : courses, isLoading , isError, error} = useGetUserCourses(userId)

  const addNewUserEvent = useCreateUserEvent();
  const updateUserEvent = useEditUserEvent();


  const [formData,setFormData] = useState<Event> ({
    id: event.id || "",
    created_by: event.created_by ||"",
    type: event.type || "",
    event_name: event.event_name || "",
    event_date: event.event_date || "",
    start_time: event.start_time || "",
    completed : event.completed || false,
    end_time: event.end_time || "",
    location: event.location || "",
    isRecurring: event.isRecurring || false,
    recurringPattern: event.recurringPattern || "weekly" as "daily" | "weekly" | "monthly",
    meetingUrl: event.meetingUrl || "",
    priority: event.priority || "" as "low" | "medium" | "high",
    event_desc: event.event_desc || "",
    schoolDetails : {
      schoolSubType : event.schoolDetails?.schoolSubType as SchoolSubtype,
      course : event.schoolDetails?.course ?? "",
      assignmentDetails : {
        assignmentName : event.schoolDetails?.assignmentDetails?.assignmentName ?? "",
        assignmentDueDate : event.schoolDetails?.assignmentDetails?.assignmentDueDate ?? ""
      },
      examDetails : {
        examDate : event.schoolDetails?.examDetails?.examDate ?? "",
        examName : event.schoolDetails?.examDetails?.examName ?? "",
        course : event.schoolDetails?.examDetails?.course ?? ""
      }
    },

  });




  const handleCreate = () => {

    const startDateTime = formattedDate(
      formData.event_date,
      formData.start_time,
    );
    const endDateTime = formattedDate(formData.event_date, formData.end_time);

    const schoolDetails = formData.schoolDetails;

    const isSchoolDetailsFilled =
        schoolDetails?.schoolSubType !== "" as SchoolSubtype ||
        schoolDetails?.course !== "" ||
        schoolDetails?.assignmentDetails?.assignmentName !== "" ||
        schoolDetails?.assignmentDetails?.assignmentDueDate !== "";


   if(isSchoolDetailsFilled && schoolDetails ){
     addNewUserEvent.mutate({
       schoolDetails: {
         schoolSubType : schoolDetails.schoolSubType,
         course : schoolDetails.course,
         assignmentDetails: {
           assginmentDueDate : schoolDetails.assignmentDetails?.assignmentDueDate ?? "",
           assignmentName :schoolDetails.assignmentDetails?.assignmentName ?? ""
         },
         examDetails: {
           examDate : schoolDetails.examDetails?.examDate ?? "",
           examName : schoolDetails.examDetails?.examName ?? "",
           course : schoolDetails.course ?? ""
         }
       },
       event_date : formData.event_date,
       event_name : formData.event_name,
       priority : formData.priority,
       meetingUrl : formData.meetingUrl,
       meetingTime : formData.meetingTime,
       recurring_pattern : formData.recurringPattern,
       isRecurring : formData.isRecurring,
       id : crypto.randomUUID(),
       created_by : userId,
       type : formData.type,
       location : formData.location,
       start_time : formData.start_time,
       end_time : formData.end_time,
     })
   }
   else{
     addNewUserEvent.mutate({
       event_date : new Date(formData.event_date).toISOString(),
       event_name : formData.event_name,
       priority : formData.priority,
       meetingUrl : formData.meetingUrl,
       meetingTime : formData.meetingTime,
       recurring_pattern : formData.recurringPattern,
       isRecurring : formData.isRecurring,
       id : crypto.randomUUID(),
       created_by : userId,
       type : formData.type,
       location : formData.location,
       start_time: startDateTime.toISOString(),
       end_time: endDateTime.toISOString(),
     })
   }
    resetForm();
  };

  const handleEdit = () => {
    const startDateTime = formattedDate(
      formData.event_date,
      formData.start_time,
    );
    const endDateTime = formattedDate(formData.event_date, formData.end_time);

    const schoolDetails = formData.schoolDetails;

    const isSchoolDetailsFilled =
        schoolDetails?.schoolSubType !== "" as SchoolSubtype ||
        schoolDetails?.course !== "" ||
        schoolDetails?.assignmentDetails?.assignmentName !== "" ||
        schoolDetails?.assignmentDetails?.assignmentDueDate !== "";

    if ( schoolDetails && isSchoolDetailsFilled) {
      try {
        updateUserEvent.mutate({
          id: formData.id,
          type: formData.type,
          event_name: formData.event_name,
          event_date: formData.event_date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          location: formData.location,
          completed : formData.completed,
          isRecurring: formData.isRecurring,
          recurring_pattern: formData.recurringPattern,
          event_desc: formData.event_desc,
          priority: formData.priority,
          schoolDetails: {
            schoolSubType: schoolDetails.schoolSubType,
            course: schoolDetails.course,
            assignmentDetails: {
              assginmentDueDate: schoolDetails.assignmentDetails?.assignmentDueDate ?? "",
              assignmentName: schoolDetails.assignmentDetails?.assignmentName ?? "",
            },
            examDetails : {
              examDate : schoolDetails.examDetails?.examDate ?? "",
              examName : schoolDetails.examDetails?.examName ?? "",
              course : schoolDetails.examDetails?.course ?? ""
            }
          },
        });
      } catch (e) {
        console.log("There was an error updating school event: ", e);
      }
  }else{
    updateUserEvent.mutate({
      id: formData.id,
      type: formData.type,
      event_name: formData.event_name,
      event_date: new Date(formData.event_date).toISOString(),
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location: formData.location,
      completed : formData.completed,
      isRecurring: formData.isRecurring,
      recurring_pattern: formData.recurringPattern,
      event_desc: formData.event_desc,
      priority: formData.priority,
      schoolDetails: {
        schoolSubType: formData.schoolDetails?.schoolSubType ?? "",
        course:  formData.schoolDetails?.course ?? "",
        assignmentDetails: {
          assginmentDueDate:  formData.schoolDetails?.assignmentDetails?.assignmentDueDate ?? "",
          assignmentName:  formData.schoolDetails?.assignmentDetails?.assignmentName ?? "",
        },
        examDetails : {
          examDate : formData.schoolDetails?.examDetails?.examDate ?? "",
          examName : formData.schoolDetails?.examDetails?.examName ?? "",
          course : formData.schoolDetails?.course ?? ""
        }
      },

    });
  };
    setOpen(!open);
  };

  const resetForm = () => {
    setOpen(!open);
    setFormData({
      id: "",
      created_by: "",
      event_desc: "",
      type: "meeting" as GeneralEventType,
      event_name: "",
      event_date: day || "",
      start_time: "",
      end_time: "",
      location: "",
      isRecurring: false,
      recurringPattern: "weekly" as "daily" | "weekly" | "monthly",
      meetingUrl: "",
      priority: "low" as "low" | "medium" | "high",
      schoolDetails : {
        schoolSubType : "assignment" as SchoolSubtype,
        course : "",
        assignmentDetails : {
          assignmentDueDate : "",
          assignmentName : ""
        }
      },

    });
  }


  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editMode) {
        try {
          handleEdit();
          resetForm();
        } catch (e) {
          console.error(`There was an error editing: ${e}`);
        }
      } else {
        try {
          handleCreate();
          resetForm();
        } catch (e) {
          console.error(`There was an error creating: ${e}`);
        }
      }
  };



  if(isLoading){
    return(
      <div>
        Loading courses..
      </div>
    )
  }
  if(isError){
    return(
      <div>
        There was an error: {String(error)}
      </div>
    )
  }



  const renderSchoolDetailssEventNameField = (
    event: Event,
    type : string,
    detailKey: 'assignmentDetails' | 'examDetails',
    fieldKey: AssignmentKey | ExamKey,
    fieldValue: string | undefined
  ) => {
    const schoolDetails = event.schoolDetails;

    if (!schoolDetails || fieldValue === undefined) {
      return null;
    }

    const currentDetailObject = schoolDetails[detailKey];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedDetailObject = {
        ...currentDetailObject,
        [fieldKey]: e.target.value,
      };

      const updatedSchoolDetails = {
        ...schoolDetails,
        [detailKey]: updatedDetailObject,
      };

      setFormData({
        ...event,
        schoolDetails: updatedSchoolDetails,
      });
    };

    return (
     <div className="space-y-2">
       <Input
         type ={type}
         id={`${schoolDetails.schoolSubType}-${fieldKey}`}
         value={fieldValue}
         onChange={handleInputChange}
       />
     </div>
    );
  };


  return(
   <form onSubmit={handleSubmit}>
     <div className="">
         {editMode ? (
           <div className="space-y-2 ">
             <Label htmlFor="type">Event Type</Label>

             <div className="flex items-center gap-2">
               <div
                 className={`h-3 w-3 rounded-full ${EVENT_TYPE_COLORS[formData.type].bg}`}
               ></div>
               <div className="flex w-full justify-between">{capitalizeString(formData.type)}</div>
               <div className="flex items-center gap-2">
                 <Checkbox
                   id="completed"
                   checked={formData.completed}
                   onCheckedChange={(checked) =>
                     setFormData({
                       ...formData,
                       completed: checked as boolean,
                     })
                   }
                 />
                 <Label htmlFor="recurring" className="cursor-pointer">
                    Completed?
                 </Label>
               </div>
             </div>

           </div>
         ) : (
           <div className="flex w-full max-w-sm flex-col gap-6">

           <Tabs value={formData.type} onValueChange={(value) =>
             setFormData({ ...formData, type: value as EventType })
           }>
             <TabsList className="w-fit" defaultValue="meeting">
             {Object.entries(EVENT_TYPE_COLORS).map(([key, value]) => (
               <TabsTrigger key={key} value={key} >
                 <div className="flex items-center gap-2">
                   <div
                     className={`h-3 w-3 rounded-full ${value.bg}`}
                   />
                   {value.label}
                 </div>
               </TabsTrigger>
             ))}
             </TabsList>
           </Tabs>
           </div>
         )}
         {formData.type === "school" && courses && formData.schoolDetails ?(
           <div>
             <div className="space-y-2 ">
               <Label htmlFor="courses">Type</Label>
               <Select
                 value={formData.schoolDetails?.schoolSubType ?? ""}
                 onValueChange={(value) =>
                   setFormData(prevFormData => ({
                     ...prevFormData,
                     schoolDetails: {
                       ...(prevFormData.schoolDetails || {}),
                       schoolSubType: value as SchoolSubtype,
                       course: prevFormData.schoolDetails?.course || "",
                     },
                   }))
                 }
               >
                 <SelectTrigger>
                   <SelectValue placeholder={"Select Type"} />
                 </SelectTrigger>
                 <SelectContent >
                  <SelectItem value="assignment">
                    <div className="flex items-center gap-2">
                     Assignment
                    </div>
                  </SelectItem>
                  <SelectItem value="exam">
                    <div className="flex items-center gap-2">
                      Exam
                    </div>
                  </SelectItem>
                  <SelectItem value="meeting">
                    <div className="flex items-center gap-2">
                      Meeting
                    </div>
                  </SelectItem>
                 </SelectContent>
               </Select>

             </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 ">
                <Label htmlFor="courses">Courses</Label>
                <Select
                  defaultValue="course"
                  value={formData.schoolDetails?.course ?? ""}
                  onValueChange={(value) =>
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      schoolDetails: {
                        ...(prevFormData.schoolDetails || {}),
                        course: value || "",
                        schoolSubType: formData.schoolDetails?.schoolSubType as SchoolSubtype,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={"Select Course"} />
                  </SelectTrigger>
                  <SelectContent >
                    {Object.entries(courses).map(([key, value]) => (
                      <SelectItem key={key} value={value.course_name} >
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full `}
                            style={{backgroundColor : value.course_color}}
                          />
                          {capitalizeString(value.course_name)}
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="other">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full bg-red-500`}
                        />
                         Other
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

              </div>

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
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRIORITYLEVEL).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full ${value.bg}`}
                          />
                          {capitalizeString(value.label)}
                        </div>
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>

              </div>

            </div>
             <div className={"space-y-2"}>
               <h3 className={"flex text-sm opacity-65 mt-3"}>{capitalizeString(formData.schoolDetails?.schoolSubType)} Details</h3>
               {formData.schoolDetails?.schoolSubType == "assignment" && (
                       <div className="grid grid-cols-2 gap-4 mt-4">
                       <div className="space-y-2 ">
                         <Label htmlFor={`${formData.schoolDetails?.schoolSubType}`}>{capitalizeString(formData.schoolDetails?.schoolSubType)} Name</Label>
                         {renderSchoolDetailssEventNameField(
                             formData,
                             "",
                             "assignmentDetails",
                             "assignmentName",
                             formData.schoolDetails.assignmentDetails?.assignmentName
                         )}

                       </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${formData.schoolDetails?.schoolSubType}`}>{capitalizeString(formData.schoolDetails?.schoolSubType)} Due Date</Label>
                            {renderSchoolDetailssEventNameField(
                                formData,
                                "datetime-local",
                                "assignmentDetails",
                                "assignmentDueDate",
                                formData.schoolDetails.assignmentDetails?.assignmentDueDate
                            )}
                        </div>

                       </div>
                   )}


               {formData.schoolDetails?.schoolSubType == "exam" && (
                       <div className="grid grid-cols-2 gap-4 mt-4">
                       <div className="space-y-2 ">
                         <Label htmlFor={`${formData.schoolDetails?.schoolSubType}`}>{capitalizeString(formData.schoolDetails?.schoolSubType)} Name</Label>
                         {renderSchoolDetailssEventNameField(
                             formData,
                             "",
                             "examDetails",
                             "examName",
                             formData.schoolDetails.examDetails?.examName
                         )}

                       </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${formData.schoolDetails?.schoolSubType}`}>{capitalizeString(formData.schoolDetails?.schoolSubType)} Due Date</Label>
                            {renderSchoolDetailssEventNameField(
                                formData,
                                "datetime-local",
                                "examDetails",
                                "examDate",
                                formData.schoolDetails.examDetails?.examDate
                            )}
                        </div>

                       </div>
                   )}
             </div>


             <Separator className="mt-4"/>


          <div className="mt-3">
            <EventField
             value={formData.event_desc}
             fieldName="Notes"
             setFormData={setFormData}
             prevFormData={formData}
             isRequired={true}
             stateName="event_desc"
             placeholder="Some Notes"
             AlternativeComponent={Textarea}
            />
          </div>
          {editMode ? (
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant={"default"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={SCHOOL_SUB_TYPES[formData.schoolDetails?.schoolSubType]?.bg}
                type="submit"
              >
                Update {capitalizeString(formData.schoolDetails?.schoolSubType)}
              </Button>
            </div>


          ): (
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant={"default"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={SCHOOL_SUB_TYPES[formData.schoolDetails?.schoolSubType]?.bg}
                type="submit"
              >
                Create {capitalizeString(formData.schoolDetails?.schoolSubType)}
              </Button>
            </div>
          )}
           </div>
         ):(
           <div className="space-y-2">
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
                           <div
                             className={`h-3 w-3 rounded-full ${value.bg}`}
                           />
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

             {formData.type=== "meeting" && (
               <EventField
                 value={formData.meetingUrl}
                 placeholder="https://meeting-link.com"
                 type="url"
                 stateName="meetingUrl"
                 fieldName="Meeting URL"
                 isRequired={false}
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

             {editMode ? (
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
                   className={`${EVENT_TYPE_COLORS[formData.type].bg} hover:bg-primary hover:cursor-pointer`}
                 >
                   Update {capitalizeString(formData.type)}
                 </Button>
               </div>
             ) : (
               <div className="flex justify-end gap-2 pt-4">
                 <Button
                   type="button"
                   variant={"default"}
                   onClick={() => setOpen(false)}
                 >
                   Cancel
                 </Button>
                 <Button
                   className={EVENT_TYPE_COLORS[formData.type as GeneralEventType ]?.bg}
                   type="submit"
                 >
                   Create {capitalizeString(formData.type)} Event
                 </Button>
               </div>
             )}
           </div>
         )}
     </div>
   </form>

  )

}
