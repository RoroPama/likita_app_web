import React from "react";
import { useLike } from "../../../../hooks/useLike";

interface LikeEventButtonProps {
  eventId: string;
  isLiked?: boolean;
  initialLikesCount?: number;
}

const LikeEventButton: React.FC<LikeEventButtonProps> = ({
  eventId,
  isLiked = false,
  initialLikesCount = 0,
}) => {
  const {
    isLiked: liked,
    likesCount,
    toggleLike,
    loading,
  } = useLike({
    eventId,
    initialIsLiked: isLiked,
    initialLikesCount,
  });

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={"flex items-center gap-1 text-sm  text-gray-500 "}
    >
      <span>{liked ? "❤️" : "🤍"}</span>
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeEventButton;
