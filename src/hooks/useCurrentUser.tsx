import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user";

type AuthResponse = {
  success: boolean;
  data?: User;
  message: string;
};

export const useCurrentUser = () => {
  return useQuery<AuthResponse, Error, User | undefined>({
    queryKey: ["user"],
    select: (data: AuthResponse) => data?.data,
    enabled: false,
  });
};
