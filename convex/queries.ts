import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./_generated/api";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";

export function useCreateUserEvent() {
  const mutationFn = useConvexMutation(api.myFunctions.createEvent);
  return useMutation({ mutationFn });
}

export function useGetUserEvents(userId: string) {
  const { data, isLoading, error, isError } = useQuery(
    convexQuery(api.myFunctions.getUserEvents, { userId })
  );
  return { data, isLoading, isError, error };
}
