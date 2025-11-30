
import { Course } from "@/lib/types/event"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventField from "../eventField";
import {SliderPicker } from 'react-color';
import { Label } from "@/components/ui/label";
import { useCreateCourse } from "@/convex/mutations";

type CreateCourseProps={
  courses : Course[];
  user_id : string
}

export default function CreateCourse({courses, user_id}: CreateCourseProps){
  const courseCreate = useCreateCourse();
  const [course, setCourse] = useState<Course>({
    courseCode : "",
    courseColor : "",
    courseName : "",
    prof : "",
    id : "",
    created_by : ""
  })

  const handleSubmit=(e: React.FormEvent)=>{
      // use mutate function to create course
      const courseData : Course = {
        courseCode : course.courseCode,
        courseColor : course.courseColor,
        courseName : course.courseName,
        prof : course.prof,
        id: crypto.randomUUID(),
        created_by : user_id
      }
      if(courseData){
        courseCreate.mutate({
          created_by : courseData.created_by,
          id : courseData.id,
          course_name : courseData.courseName,
          course_code : courseData.courseCode,
          course_color : courseData.courseColor,
          prof : courseData.prof,
        })
      }

  }

  return(
    <div>
      <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus/>
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className=" max-w-2xl  bg-background focus-primary">
            <DialogHeader>
              <div className="flex flex-row gap-2 ">
                <div className={`rounded-full h-4 w-4 `} style={{backgroundColor: course.courseColor}}></div>
                <DialogTitle>
                  Add New Course
                </DialogTitle>
              </div>
                <DialogDescription>
                  Here you can add a new course following the prompts.
                </DialogDescription>
            </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              <EventField
                value={course.courseCode}
                prevFormData={course}
                fieldName="Course Code"
                stateName = {"courseCode"}
                setFormData={setCourse}
                placeholder="CSC 2200"
                isRequired={true}
              />

              <EventField
                value={course.courseName}
                prevFormData={course}
                fieldName="Course Name"
                stateName = {"courseName"}
                setFormData={setCourse}
                placeholder="Calculus 3"
                isRequired={true}
              />

            </div>
            <div className="mt-2 grid grid-cols-2 gap-8">
              <EventField
                value={course.prof}
                prevFormData={course}
                fieldName="Professor's Name"
                stateName = {"prof"}
                setFormData={setCourse}
                placeholder="Prof.Torvalds"
              />

             <div className="space-y-2">
               <Label>Course Color</Label>
              <SliderPicker
              color={course.courseColor}
              onChange={(e)=>{
                (setCourse({...course, courseColor: e.hex})
                )}}
              />
             </div>
            </div>
            <Button type="submit" variant={"default"}>
              Create Course
            </Button>
          </form>

          </DialogContent>
      </Dialog>
    </div>
  )
}
