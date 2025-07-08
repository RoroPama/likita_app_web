import type { User } from "../types/user";
import { apiRequest } from "../utils/api_request";
import AuthService from "../utils/auth_service";
import constants from "../utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AuthResponseData {
  user: User;
  token?: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation<
    AuthResponseData,
    Error,
    {
      username: string;
      email: string;
      password: string;
    }
  >({
    mutationFn: async (userData) => {
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      if (userData.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      const response = await apiRequest(`${constants.API_BASE_URL}/users`, {
        method: "POST",
        body: userData,
      });

      if (!response.success) {
        throw new Error(
          response.error || "Une erreur s'est produite lors de l'inscription"
        );
      }
      return response.data as AuthResponseData;
    },
    onSuccess: (data) => {
      if (data) {
        const user = data?.user;
        if (user) {
          const userData: User = {
            id: user.id,
            username: user.username,
            email: user.email,
          };

          if (data.token) {
            AuthService.setToken(data.token);
          }

          queryClient.setQueryData<User | null>(["user"], userData);
        }
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription:", error.message);
    },
  });

  const loginMutation = useMutation<
    AuthResponseData,
    Error,
    {
      email: string;
      password: string;
    }
  >({
    mutationFn: async (userData) => {
      if (!userData.email || !userData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      if (userData.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      const response = await apiRequest(
        `${constants.API_BASE_URL}/auth/login`,
        {
          method: "POST",
          body: userData,
        }
      );

      if (!response.success) {
        throw new Error(
          response.error || "Une erreur s'est produite lors de la connexion"
        );
      }

      const data = response.data as AuthResponseData;
      return data;
    },
    onSuccess: (data) => {
      console.log("token2", data.token);

      const user = data?.user;
      if (user) {
        const userData: User = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        if (data.token) {
          AuthService.setToken(data.token);
        }

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
        const token = AuthService.getToken();

        if (!token) {
          queryClient.setQueryData(["user"], null);
          return null;
        }

        const response = await apiRequest(
          `${constants.API_BASE_URL}/auth/checkAuth`,
          {
            method: "GET",
            insertToken: true,
          }
        );

        if (!response.success) {
          AuthService.removeToken();
          queryClient.setQueryData(["user"], null);
          return null;
        }

        if ((response.data as { user?: User })?.user) {
          const userObj = (response.data as { user: User }).user;
          const userData: User = {
            id: userObj.id,
            username: userObj.username,
            email: userObj.email,
          };
          return userData;
        }

        return null;
      } catch (error) {
        AuthService.removeToken();
        queryClient.setQueryData(["user"], null);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const logout = () => {
    AuthService.removeToken();
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
