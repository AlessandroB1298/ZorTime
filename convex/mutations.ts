import { useMutation } from "@tanstack/react-query";
import { api } from "./_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";

export function useEditUserEvent() {
  const mutationFn = useConvexMutation(api.myFunctions.updateUserEvent);
  return useMutation({ mutationFn });
}

export function useDeleteUserEvent() {
  const mutationFn = useConvexMutation(api.myFunctions.deleteUserEvent);
  return useMutation({ mutationFn });
}

export function useCreateCourse() {
  const mutationFn = useConvexMutation(api.myFunctions.createCourse);
  return useMutation({ mutationFn });
}
