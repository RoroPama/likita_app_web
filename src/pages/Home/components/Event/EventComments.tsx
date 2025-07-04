import type { CommentModel } from "../../../../types/comment_model";

import EventComment from "./EventComment";
import AddComment from "./AddComment";
import { useComments } from "../../../../hooks/useComment";

interface EventCommentsProps {
  eventId: string;
  onClose: () => void;
}

const EventComments: React.FC<EventCommentsProps> = ({ eventId, onClose }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useComments(eventId);

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
            <EventComment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3 items-end">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-xs text-white font-semibold flex-shrink-0">
            Moi
          </div>
          <AddComment eventId={eventId} />
        </div>
      </div>
    </div>
  );
};

export default EventComments;
