import { Course } from "@/lib/types/event"
import EventField from "../eventField"
import { useState } from "react"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { capitalizeString } from "@/lib/event-utils"
import { Separator } from "@/components/ui/separator"
import { schoolType } from "@/lib/types/assignment"

import {
  Priority,
  PRIORITYLEVEL,
} from "@/lib/types/event";
import { Textarea } from "@/components/ui/textarea"

type AssignmentFormProps={
  courses : Course[],

}

export default function AssignmentEventForm({courses}: AssignmentFormProps){
  const [assignment, setAssignment] = useState({
    assignment_name : "",
    assignment_due_date : "",
    course: "",
    notes : "",
    priority : "",
    type : "assignment" as schoolType
  })

    return(
      <div>
        <div className="space-y-2 ">
          <Label htmlFor="courses">Type</Label>
          <Select
            value={assignment.type}
            onValueChange={(value) =>
              setAssignment({
                ...assignment,
                type: value as schoolType,
              })
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
             <SelectItem value="Exam">
               <div className="flex items-center gap-2">
                 Exam
               </div>
             </SelectItem>
             <SelectItem value="Meeting">
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
             defaultValue="course1"
             value={assignment.course}
             onValueChange={(value) =>
               setAssignment({
                 ...assignment,
                 course: value as string,
               })
             }
           >
             <SelectTrigger>
               <SelectValue placeholder={"Select Course"} />
             </SelectTrigger>
             <SelectContent >
               {Object.entries(courses).map(([key, value]) => (
                 <SelectItem key={key} value={key} >
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
             value={assignment.priority}
             onValueChange={(value) =>
               setAssignment({
                 ...assignment,
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
          <h3 className={"flex text-sm opacity-65 mt-3"}>{capitalizeString(assignment.type)} Details</h3>
        </div>
        <Separator/>
        <div className="grid grid-cols-2 gap-4 mt-4">

        <EventField
          value={assignment.assignment_name}
          fieldName={`${capitalizeString(assignment.type)} Name`}
          setFormData={setAssignment}
          prevFormData={assignment}
          isRequired={true}
          stateName="assignment_name"
          placeholder="Calc 3 Assignment 1"

        />

        <EventField
            value={assignment.assignment_due_date}
            fieldName="Due Date"
            setFormData={setAssignment}
            prevFormData={assignment}
            isRequired={true}
            stateName="assignment_due_date"
            type="date"
          />
      </div>
     <div className="mt-3">
       <EventField
        value={assignment.notes}
        fieldName="Notes"
        setFormData={setAssignment}
        prevFormData={assignment}
        isRequired={true}
        stateName="notes"
        placeholder="Some Notes"
        AlternativeComponent={Textarea}
       />
     </div>
      </div>
    )
}
