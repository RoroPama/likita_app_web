import React, { useState, useCallback, useMemo } from "react";
import type { Event } from "../../../../types/event";
import EventCardHeader from "./EventCardHeader";
import EventCardProfile from "./EventCardProfile";
import EventComments from "./EventComments";
import EventShareOptions from "./EventShareOptions";
import { getTimeAgo } from "../../../../utils/fonction";
import LikeEventButton from "./LikeEventButton";

interface EventCardProps {
  event: Event;
  onLike?: (eventId: string, liked: boolean) => void;
  onComment?: (eventId: string) => void;
  onSave?: (eventId: string, saved: boolean) => void;
  onShare?: (eventId: string) => void;
  onReport?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onComment,
  onSave,
  onShare,
}) => {
  const [isSaved, setIsSaved] = useState(event.isSaved || false);
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const commentsCount = event.stats?.comments;

  const handleSave = useCallback(() => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    onSave?.(event.id, newSavedState);
  }, [isSaved, onSave, event.id]);

  const handleToggleComments = useCallback(() => {
    setCommentsIsOpen((isOpen) => !isOpen);
    onComment?.(event.id);
  }, [onComment, event.id]);

  const getStatusConfig = useCallback((status: string) => {
    switch (status) {
      case "live":
        return {
          text: "En Direct",
          color: "bg-red-500",
        };
      case "coming":
        return {
          text: "À venir",
          color: "bg-blue-500",
        };
      default:
        return {
          text: "À venir",
          color: "bg-blue-500",
        };
    }
  }, []);

  const statusConfig = useMemo(
    () => getStatusConfig(event.status),
    [event.status, getStatusConfig]
  );

  const createAt = new Date(event.createdAt!);
  const timeEgo = getTimeAgo(createAt);

  return (
    <div className="bg-white w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[85%] mb-6 shadow-sm border-0 md:border md:border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 md:rounded-lg mx-auto">
      <EventCardHeader>
        <div className="flex items-center gap-3">
          <EventCardProfile urlProfile="" username={event.organizer.username} />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {event.organizer.username}
            </h4>
            <span className="text-xs text-gray-500">{timeEgo}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${statusConfig.color} rounded-full`}></div>
          <span className="text-xs font-medium text-gray-600">
            {statusConfig.text}
          </span>
        </div>
      </EventCardHeader>

      {/* Image */}
      <div className="relative">
        <div className="w-full h-48 sm:h-80 lg:h-96 bg-gray-100 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.imageUrl}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight">
          {event.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📅</span>
            <span>{event.details.date}</span>
          </div>

          {event.details.platform && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>💻</span>
              <span>{event.details.platform}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <LikeEventButton
              eventId={event.id}
              isLiked={event.isLiked}
              initialLikesCount={event.stats?.likes}
            />

            <button
              onClick={handleToggleComments}
              className={`flex items-center gap-1 text-sm transition-colors ${
                commentsIsOpen
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <span>💬</span>
              <span>{commentsCount}</span>
            </button>

            <button
              onClick={handleSave}
              className={`text-sm ${
                isSaved
                  ? "text-yellow-500"
                  : "text-gray-500 hover:text-yellow-500"
              } transition-colors`}
            >
              {isSaved ? "📌" : "🔖"}
            </button>

            <EventShareOptions
              eventId={event.id}
              eventTitle={event.title}
              onShare={onShare}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🏷️</span>
            <span>{event.type}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={event.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            Accéder à l'événement
          </a>
        </div>
      </div>

      {commentsIsOpen && (
        <EventComments
          eventId={event.id}
          onClose={() => setCommentsIsOpen(false)}
        />
      )}
    </div>
  );
};

export default EventCard;
