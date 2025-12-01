
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
  user_id : string
}

export default function CreateCourse({user_id}: CreateCourseProps){
  const courseCreate = useCreateCourse();
  const [course, setCourse] = useState<Course>({
    course_code : "",
    course_color : "",
    course_name : "",
    prof : "",
    id : "",
    created_by : ""
  })

  const handleSubmit=(e: React.FormEvent)=>{
      e.preventDefault();
      // use mutate function to create course
      const courseData : Course = {
        course_code : course.course_code,
        course_color : course.course_color,
        course_name : course.course_name,
        prof : course.prof,
        id: crypto.randomUUID(),
        created_by : user_id
      }
      if(courseData){
        courseCreate.mutate({
          created_by : courseData.created_by,
          id : courseData.id,
          course_name : courseData.course_name,
          course_code : courseData.course_code,
          course_color : courseData.course_color,
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
                <div className={`rounded-full h-4 w-4 `} style={{backgroundColor: course.course_color}}></div>
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
                value={course.course_code}
                prevFormData={course}
                fieldName="Course Code"
                stateName = {"courseCode"}
                setFormData={setCourse}
                placeholder="CSC 2200"
                isRequired={true}
              />

              <EventField
                value={course.course_name}
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
              color={course.course_color}
              onChange={(e)=>{
                (setCourse({...course, course_color: e.hex})
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
