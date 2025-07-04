import { useState, useCallback } from "react";
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
      const response = await fetch(
        `${constants.API_BASE_URL}/events/${eventId}/like`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setIsLiked(currentIsLiked);
        setLikesCount(currentLikesCount);

        const errorData = await response.json();
        console.error("Erreur lors du like :", errorData);
      } else {
        const responseData = await response.json();
        console.log("Like successful:", responseData);
      }
    } catch (error) {
      setIsLiked(currentIsLiked);
      setLikesCount(currentLikesCount);

      console.error("Erreur réseau lors du like :", error);
    } finally {
      setLoading(false);
    }
  }, [eventId, isLiked, likesCount]);

  return { isLiked, likesCount, toggleLike, loading };
};
