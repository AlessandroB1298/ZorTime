"use client";
import CourseViewContainer from '@/app/components/school/courseViewContainer';
import { useUser } from '@clerk/nextjs'

export default function Page() {
  const {  user, isLoaded } = useUser()
  return (
      <div>
      {user && isLoaded && (
        <CourseViewContainer user_id={user.id}/>
      )}
    </div>
  );
}
