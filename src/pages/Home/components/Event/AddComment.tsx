import type React from "react";
import { useAddComment } from "../../../../hooks/useComment";
import { useState } from "react";

interface props {
  eventId: string;
  onCommentAdded: () => void;
}
const AddComment: React.FC<props> = ({ eventId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");

  const addCommentMutation = useAddComment();

  const handleSend = async () => {
    if (newComment.trim() && !addCommentMutation.isPending) {
      try {
        await addCommentMutation.mutateAsync({
          eventId,
          commentText: newComment.trim(),
        });
        onCommentAdded();

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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
  );
};

export default AddComment;
