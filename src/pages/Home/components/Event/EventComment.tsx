import type React from "react";
import type { CommentModel } from "../../../../types/comment_model";
import { getTimeAgo } from "../../../../utils/fonction";

interface props {
  comment: CommentModel;
}

const EventComment: React.FC<props> = ({ comment }) => {
  const created = new Date(comment.createdAt);
  const timeEgo = getTimeAgo(created);

  return (
    <div className="flex gap-3 items-start group">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-semibold flex-shrink-0 shadow-sm">
        {comment.user.avatar}
      </div>
      <div className="flex-grow">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800 text-sm">
              {comment.user.username}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {timeEgo}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {comment.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventComment;
