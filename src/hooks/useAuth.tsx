import type { User } from "../types/user";
import constants from "../utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (userData: {
      username: string;
      email: string;
      password: string;
    }) => {
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      if (userData.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      const response = await fetch(`${constants.API_BASE_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Une erreur s'est produite lors de l'inscription"
        );
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.data) {
        const userData: User = {
          id: data.data._id || data.data.id,
          username: data.data.username,
          email: data.data.email,
        };
        queryClient.setQueryData<User | null>(["user"], userData);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription:", error.message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      if (!userData.email || !userData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      if (userData.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      const response = await fetch(`${constants.API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Une erreur s'est produite lors de la connexion"
        );
      }
      return response.json();
    },
    onSuccess: (data) => {
      const user: User | undefined = data.data?.user;
      if (user) {
        const userData: User = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        queryClient.setQueryData<User | null>(["user"], userData);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion:", error.message);
    },
  });

  const {
    data: user,
    isLoading: isAuthLoading,
    isError: isAuthError,
    error: authError,
    isSuccess: isAuthSuccess,
    isFetching: isAuthFetching,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${constants.API_BASE_URL}/auth/checkAuth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          queryClient.setQueryData(["user"], null);
          return null;
        }

        const jsonDecoded = await response.json();

        if (jsonDecoded.data?.user) {
          const userData: User = {
            id: jsonDecoded.data.user.id,
            username: jsonDecoded.data.user.username,
            email: jsonDecoded.data.user.email,
          };
          return userData;
        }

        return null;
      } catch (error) {
        queryClient.setQueryData(["user"], null);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const logout = () => {
    queryClient.setQueryData(["user"], null);
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const isLoading =
    registerMutation.isPending ||
    loginMutation.isPending ||
    isAuthLoading ||
    isAuthFetching;
  const error = registerMutation.error || loginMutation.error || authError;
  const isSuccess =
    registerMutation.isSuccess || loginMutation.isSuccess || isAuthSuccess;

  const clearError = () => {
    registerMutation.reset();
    loginMutation.reset();
  };

  const clearSuccess = () => {
    registerMutation.reset();
    loginMutation.reset();
  };

  return {
    user,
    isLoading,
    error,
    isSuccess,

    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout,

    isAuthenticated: !!user,
    isAuthenticating: isAuthLoading || isAuthFetching,
    authCheckError: isAuthError,
    authChecked: !isAuthFetching && !isAuthLoading,
    clearError,
    clearSuccess,
  };
};
