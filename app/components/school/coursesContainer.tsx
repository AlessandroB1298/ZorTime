"use client"
import { Course } from "@/lib/types/event"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventField from "../eventField";
import {SliderPicker } from 'react-color';
import { Label } from "@/components/ui/label";
import { useCreateCourse, useDeleteCourse, useUpdateCourse } from "@/convex/mutations";


type CoursesContainerProps={
  courses : Course[];
  user_id : string
}
export default function CoursesContainer({courses, user_id}: CoursesContainerProps){
  const courseCreate = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);


  const defaultCourse : Course = {
    course_code : "",
    course_color : "",
    course_name : "",
    prof : "",
    id : "",
    created_by: ""
  }
  const [course, setCourse] = useState<Course>({
   ...defaultCourse
  })


  useEffect(()=>{
    if(!editMode){
      resetForm();
    }

  },[editMode])

  const resetForm=()=>{
    setCourse({
      course_code : "",
      course_color : "",
      course_name : "",
      prof : "",
      id : "",
      created_by: ""
    })
  }
  const handleCreate=()=>{
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
    const handleEdit=()=>{

      updateCourse.mutate({
        created_by : course.created_by,
        id : course.id,
        course_name : course.course_name,
        course_code : course.course_code,
        course_color : course.course_color,
        prof : course.prof,
      })
    }
  const handleSubmit=(e: React.FormEvent)=>{
      e.preventDefault();
      if(editMode){
        try{
            handleEdit();
            setEditMode(!editMode);
        }catch(e){
          console.error(e)
        }
      }else{
        try{
          handleCreate();
        }catch(e){
          console.error(e)
        }
      }

      resetForm();
  }


  return(
        <Card className="m-8">
            <CardHeader>
              <div className="flex justify-between m-0 p-0">
                <CardTitle>My Courses</CardTitle>
                <Dialog open={open} onOpenChange={setOpen}>
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
                          stateName = {"course_code"}
                          setFormData={setCourse}
                          placeholder="CSC 2200"
                          isRequired={true}
                        />

                        <EventField
                          value={course.course_name}
                          prevFormData={course}
                          fieldName="Course Name"
                          stateName = {"course_name"}
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
                      <Button onClick={()=>{setOpen(!open)}} type="submit" variant={"default"}>
                        Add Course
                      </Button>
                    </form>
                    </DialogContent>
                </Dialog>

              </div>
              <CardDescription>Currently enrolled courses</CardDescription>

            </CardHeader>
            <CardContent>

              <div className="flex flex-wrap gap-3">
                {courses.map(courseToEdit => (
                 <Dialog open={editMode} onOpenChange={setEditMode} key={courseToEdit.id}>
                   <DialogTrigger onClick={()=>{
                     setCourse(courseToEdit);
                   }}>
                     <Badge  className="flex items-center gap-2 h-8 bg-accent/30">
                       <div className={`w-4 h-4 rounded `} style={{backgroundColor: courseToEdit.course_color}}></div>
                       <span>{courseToEdit.course_code}</span>
                       <span className="text-muted-foreground">-</span>
                       <span className="text-card-foreground">{courseToEdit.course_name}</span>
                     </Badge>
                   </DialogTrigger>

                   <DialogContent>
                     <DialogHeader>
                       <div className="flex flex-row gap-2 ">
                         <div className={`rounded-full h-4 w-4  `} style={{backgroundColor: course.course_color}}></div>
                         <DialogTitle>
                           Update {courseToEdit.course_name}
                         </DialogTitle>
                       </div>
                       <DialogDescription>
                         Here you can update or delete the course you've selcted.
                       </DialogDescription>
                     </DialogHeader>
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-2 gap-8 space-y-2">
                            <EventField
                              value={course.course_code}
                              prevFormData={course}
                              fieldName="Course Code"
                              stateName = {"course_code"}
                              setFormData={setCourse}
                              placeholder="CSC 2200"
                              isRequired={true}
                            />

                            <EventField
                              value={course.course_name}
                              prevFormData={course}
                              fieldName="Course Name"
                              stateName = {"course_name"}
                              setFormData={setCourse}
                              placeholder="Calculus 3"
                              isRequired={true}
                            />

                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-8 space-y-2">
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

                           <div className="flex flex-row gap-2 mt-4 items-center justify-center w-full ">
                             <Button className="bg-primary/20 hover::cursor-pointer hover:bg-red-600" onClick={()=>{setOpen(!open); deleteCourse.mutate({ id : course.id, userId : user_id})}} type="submit" variant={"default"}>
                               Delete Course
                             </Button>
                             <Button onClick={()=>{}} type="submit" variant={"default"}>
                               Updated Course
                             </Button>
                           </div>
                        </form>

                   </DialogContent>
                 </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
  )

}
