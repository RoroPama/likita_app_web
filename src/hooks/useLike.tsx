import { useCallback, useState } from "react";
import { apiRequest } from "../utils/api_request";
import constants from "../utils/constants";

interface UseLikeOptions {
  eventId: string;
  initialIsLiked?: boolean;
  initialLikesCount?: number;
}

export const useLike = ({
  eventId,
  initialIsLiked = false,
  initialLikesCount = 0,
}: UseLikeOptions) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    setLoading(true);

    const currentIsLiked = isLiked;
    const currentLikesCount = likesCount;

    const newLikedState = !currentIsLiked;
    setIsLiked(newLikedState);
    setLikesCount(
      newLikedState ? currentLikesCount + 1 : currentLikesCount - 1
    );

    try {
      const response = await apiRequest(
        `${constants.API_BASE_URL}/events/${eventId}/like`,
        {
          method: "PATCH",
          insertToken: true,
        }
      );

      if (!response.success) {
        setIsLiked(currentIsLiked);
        setLikesCount(currentLikesCount);
        console.error("Erreur lors du like:", response.error);
      } else {
        console.log("Like successful:", response.data);
      }
    } catch (error) {
      setIsLiked(currentIsLiked);
      setLikesCount(currentLikesCount);
      console.error("Erreur lors du like:", error);
    } finally {
      setLoading(false);
    }
  }, [eventId, isLiked, likesCount]);

  return { isLiked, likesCount, toggleLike, loading };
};
