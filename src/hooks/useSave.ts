import { useState, useCallback } from "react";
import constants from "../utils/constants";
import { apiRequest } from "../utils/api_request";

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
      const response = await apiRequest(
        `${constants.API_BASE_URL}/events/${eventId}/save`,
        {
          method: "PATCH",
          insertToken: true,
        }
      );

      if (!response.success) {
        setIsSaved(currentIsSaved);
        console.error("Erreur lors de l'enregistrement:", response.error);
      } else {
        console.log("Enregistrement réussi:", response.data);
      }
    } catch (error) {
      setIsSaved(currentIsSaved);
      console.error("Erreur lors de l'enregistrement:", error);
    } finally {
      setLoading(false);
    }
  }, [eventId, isSaved]);

  return { isSaved, toggleSave, loading };
};
