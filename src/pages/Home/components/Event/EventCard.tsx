import React, { useState, useCallback, useMemo } from "react";
import type { Event } from "../../../../types/event";
import EventCardProfile from "./EventCardProfile";
import EventComments from "./EventComments";
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

const EventCard: React.FC<EventCardProps> = ({ event, onComment, onSave }) => {
  const [isSaved, setIsSaved] = useState(event.isSaved || false);
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

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

  const handleCopyLink = useCallback(() => {
    const eventLink = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(eventLink).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    });
  }, [event.id]);

  const getStatusConfig = useCallback((status: string) => {
    switch (status) {
      case "live":
        return {
          text: "En Direct",
          color: "bg-red-500",
          textColor: "text-red-600",
          bgColor: "bg-red-50",
        };
      case "coming":
        return {
          text: "À venir",
          color: "bg-blue-500",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50",
        };
      default:
        return {
          text: "À venir",
          color: "bg-blue-500",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50",
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
    <div className="bg-white w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[85%] mb-8 shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 md:rounded-2xl mx-auto group">
      <div className="p-6 pb-4 border-b border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <EventCardProfile
              urlProfile=""
              username={event.organizer.username}
            />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {event.organizer.username}
              </h4>
              <span className="text-xs text-gray-500">{timeEgo}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 ${statusConfig.bgColor} rounded-full`}
          >
            <div
              className={`w-2 h-2 ${statusConfig.color} rounded-full animate-pulse`}
            ></div>
            <span className={`text-xs font-medium ${statusConfig.textColor}`}>
              {statusConfig.text}
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="w-full h-48 sm:h-80 lg:h-96 bg-gray-100 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4 leading-tight line-clamp-2">
          {event.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-lg">📅</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Date</p>
              <p className="text-sm text-gray-900 font-semibold">
                {event.details.date}
              </p>
            </div>
          </div>

          {event.details.platform && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">💻</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Plateforme</p>
                <p className="text-sm text-gray-900 font-semibold">
                  {event.details.platform}
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {event.description}
        </p>

        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            🏷️ {event.type}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-6">
            <LikeEventButton
              eventId={event.id}
              isLiked={event.isLiked}
              initialLikesCount={event.stats?.likes}
            />

            <button
              onClick={handleToggleComments}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                commentsIsOpen
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <span className="text-lg">💬</span>
              <span className="text-sm font-medium">{commentsCount}</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isSaved
                  ? "bg-yellow-100 text-yellow-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-yellow-600"
              }`}
            >
              <span className="text-lg">{isSaved ? "📌" : "🔖"}</span>
              <span className="text-sm font-medium">
                {isSaved ? "Sauvegardé" : "Sauvegarder"}
              </span>
            </button>

            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isLinkCopied
                  ? "bg-green-100"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <span className="text-lg">{"🔗"}</span>
              <span className="text-sm font-medium">
                {isLinkCopied ? "Copié !" : "Copier le lien"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={event.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>🚀</span>
            Accéder à l'événement
          </a>
        </div>
      </div>

      {commentsIsOpen && (
        <div className="border-t border-gray-100">
          <EventComments
            eventId={event.id}
            onClose={() => setCommentsIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard;
