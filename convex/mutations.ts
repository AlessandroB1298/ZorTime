import { useMutation } from "@tanstack/react-query";
import { api } from "./_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
// function to edit events, need to use id from event and userId
export function useEditUserEvent() {
  const mutationFn = useConvexMutation(api.myFunctions.updateUserEvent);
  return useMutation({ mutationFn });
}

//function to delete events based on id of event

export function useDeleteUserEvent() {
  const mutationFn = useConvexMutation(api.myFunctions.deleteUserEvent);
  return useMutation({ mutationFn });
}
