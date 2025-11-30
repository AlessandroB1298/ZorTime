"use client";
import { Course } from "@/lib/types/event";
import CoursesContainer from "@/app/components/school/coursesContainer";
import { useUser } from '@clerk/nextjs'
import { useGetUserCourses } from "@/convex/queries";
import { Loader2 } from "lucide-react";

type CourseViewContainerProps={
  user_id : string
}
export default function CourseViewContainer({user_id}:CourseViewContainerProps) {
  const{data, isLoading, isError, error} = useGetUserCourses(user_id)


  if(isLoading){
    return(
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    )
  }
  if(isError){
    return(
      <div className="flex items-center justify-center">
        <div>
          {error?.message+"" +error?.stack}
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center justify-between m-4">
          <div>
            <h1 className="mb-2">University Dashboard</h1>
            <p className="text-muted-foreground">Fall 2025 Semester</p>
        </div>
      </div>
      {data && (
        <div>
           <CoursesContainer user_id={user_id} courses={data}/>
        </div>
      )}
    </div>
  );
}
