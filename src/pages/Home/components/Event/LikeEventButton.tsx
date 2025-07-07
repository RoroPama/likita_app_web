import React from "react";
import { useLike } from "../../../../hooks/useLike";
import { Heart } from "lucide-react";

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
      <Heart
        className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
      />{" "}
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeEventButton;
