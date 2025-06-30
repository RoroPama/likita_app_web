import { useState } from "react";
import constants from "../utils/constants";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      if (!userData.username || !userData.email || !userData.password) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      if (userData.password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      console.log(userData);
      const response = await fetch(`${constants.API_BASE_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Une erreur s'est produite lors de l'inscription"
        );
      }

      const data = await response.json();
      setSuccess(true);

      return {
        success: true,
        data: data,
        message: "Inscription réussie",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Une erreur s'est produite";
      setError(errorMessage); // Important : bien définir l'erreur dans le state

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

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

      const data = await response.json();
      setSuccess(true);

      return {
        success: true,
        data: data,
        message: "Connexion réussie",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Une erreur s'est produite";
      setError(errorMessage); // Important : bien définir l'erreur dans le state

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(false);
  };

  const checkIfAuthenticated = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${constants.API_BASE_URL}/auth/checkAuth`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);

        console.log("isSuccess", isSuccess);

        return {
          success: true,
          data: data,
          message: "Utilisateur authentifié",
        };
      }

      setSuccess(false);
    } catch (error) {
      setSuccess(false);
      setError(
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );
    } finally {
      setChecked(true);
      setLoading(false);
    }
  };

  return {
    isChecked,
    isLoading,
    error,
    isSuccess,
    register,
    clearError,
    clearSuccess,
    checkIfAuthenticated,
    login,
  };
};
