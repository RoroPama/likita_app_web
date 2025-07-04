import React, { useState } from "react";
import { useAddComment, useComments } from "../../../../hooks/useComment";
import type { CommentModel } from "../../../../types/comment_model";

interface EventCommentsProps {
  eventId: string;
  onClose: () => void;
}

const EventComments: React.FC<EventCommentsProps> = ({ eventId, onClose }) => {
  const [newComment, setNewComment] = useState("");

  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useComments(eventId);

  const addCommentMutation = useAddComment();

  const handleSend = async () => {
    if (newComment.trim() && !addCommentMutation.isPending) {
      try {
        await addCommentMutation.mutateAsync({
          eventId,
          commentText: newComment.trim(),
        });
        setNewComment("");
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire:", error);
      }
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = Math.min(target.scrollHeight, 128) + "px";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800 text-base flex items-center gap-2">
            <span className="text-blue-500">💬</span>
            Commentaires ({comments.length})
            {isLoading && (
              <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        <div className="p-4 space-y-4">
          {isLoading && comments.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500">
                  Chargement des commentaires...
                </span>
              </div>
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-red-500 text-sm">
                  ❌ Erreur de chargement
                </span>
                <button
                  onClick={() => refetch()}
                  className="text-xs text-blue-500 hover:text-blue-600 underline"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && comments.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-500 text-sm">
                Aucun commentaire pour le moment
              </span>
            </div>
          )}

          {comments.map((comment: CommentModel) => (
            <div key={comment.id} className="flex gap-3 items-start group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-semibold flex-shrink-0 shadow-sm">
                {comment.user.avatar}
              </div>
              <div className="flex-grow">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3 items-end">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-xs text-white font-semibold flex-shrink-0">
            Moi
          </div>
          <div className="flex-grow">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre commentaire..."
                className="w-full p-3 pr-12 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none min-h-[44px] max-h-32 bg-gray-50 hover:bg-white transition-colors"
                rows={1}
                onInput={handleTextareaInput}
                disabled={addCommentMutation.isPending}
              />
              <button
                onClick={handleSend}
                disabled={!newComment.trim() || addCommentMutation.isPending}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  newComment.trim() && !addCommentMutation.isPending
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {addCommentMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </div>

            {addCommentMutation.isError && (
              <div className="mt-2 text-xs text-red-500">
                Erreur lors de l'envoi du commentaire. Veuillez réessayer.
              </div>
            )}

            <div className="flex gap-2 mt-2">
              {["👏", "❤️", "🎉", "👍"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setNewComment((prev) => prev + emoji)}
                  disabled={addCommentMutation.isPending}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors disabled:opacity-50"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComments;
