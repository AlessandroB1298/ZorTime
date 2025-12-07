"use client";
import CourseViewContainer from '@/app/components/school/courseViewContainer';
import SchoolAgendaViewContainer from '@/app/components/school/schoolAgendaViewContainer';
import { useUser } from '@clerk/nextjs'

export default function Page() {
  const {  user, isLoaded } = useUser()
  return (
      <div>
      {user && isLoaded && (
        <div>
           <CourseViewContainer user_id={user.id}/>
           <SchoolAgendaViewContainer user_id = {user.id}/>
        </div>
      )}
    </div>
  );
}
