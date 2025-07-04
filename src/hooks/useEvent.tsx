import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventApi from "../api/event";
import type { Event } from "../types/event";
import type { User } from "../types/user";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventApi.createEvent,
    onSuccess: (newEvent: Event) => {
      const currentUserData = queryClient.getQueryData<User | null>(["user"]);
      queryClient.setQueryData(["events"], (oldEvents: Event[] = []) => {
        const organizer = currentUserData;

        const eventToAdd = {
          ...newEvent,
          organizer: organizer || null,
        };

        return [eventToAdd, ...oldEvents];
      });

      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
