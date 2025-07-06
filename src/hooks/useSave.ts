import { useState, useCallback } from "react";
import constants from "../utils/constants";

interface UseSaveOptions {
  eventId: string;
  initialIsSaved?: boolean;
}

export const useSave = ({
  eventId,
  initialIsSaved = false,
}: UseSaveOptions) => {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [loading, setLoading] = useState(false);

  const toggleSave = useCallback(async () => {
    setLoading(true);

    const currentIsSaved = isSaved;
    setIsSaved(!currentIsSaved);

    try {
      const response = await fetch(
        `${constants.API_BASE_URL}/events/${eventId}/save`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setIsSaved(currentIsSaved);
        const errorData = await response.json();
        console.error("Erreur lors de l'enregistrement:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Enregistrement réussi:", responseData);
      }
    } catch (error) {
      setIsSaved(currentIsSaved);
      console.error("Erreur réseau lors de l'enregistrement:", error);
    } finally {
      setLoading(false);
    }
  }, [eventId, isSaved]);

  return { isSaved, toggleSave, loading };
};
