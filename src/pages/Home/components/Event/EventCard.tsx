import React, { useState, useCallback, useMemo } from "react";
import type { Event } from "../../../../types/event";
import EventCardProfile from "./EventCardProfile";
import EventComments from "./EventComments";
import LikeEventButton from "./LikeEventButton";
import SaveEventButton from "./SaveEventButton";
import { getTimeAgo } from "../../../../utils/fonction";
import {
  Calendar,
  Laptop,
  Tag,
  MessageCircle,
  Link as LinkIcon,
  Clock,
} from "lucide-react";

interface EventCardProps {
  event: Event;
  onLike?: (eventId: string, liked: boolean) => void;
  onComment?: (eventId: string) => void;
  onSave?: (eventId: string, saved: boolean) => void;
  onShare?: (eventId: string) => void;
  onReport?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onComment }) => {
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [commentsCount, setCountCount] = useState(event.stats?.comments);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleToggleComments = useCallback(() => {
    setCommentsIsOpen((isOpen) => !isOpen);
    onComment?.(event.id);
  }, [onComment, event.id]);

  const handleCopyLink = useCallback(() => {
    const eventLink = `${event.liveUrl}`;
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
          textColor: "text-red-600",
          bgColor: "bg-red-50",
          dotColor: "bg-red-500",
        };
      case "coming":
      default:
        return {
          text: "À venir",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50",
          dotColor: "bg-blue-500",
        };
    }
  }, []);

  // Fonction pour formater la date et l'heure de façon professionnelle
  const formatEventDateTime = useCallback((dateString: string) => {
    try {
      const eventDate = new Date(dateString);

      // Vérifier si la date est valide
      if (isNaN(eventDate.getTime())) {
        return { date: dateString, time: null, weekday: null };
      }

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Europe/Paris",
      };

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
      };

      const formattedDate = eventDate.toLocaleDateString("fr-FR", options);
      const formattedTime = eventDate.toLocaleTimeString("fr-FR", timeOptions);
      const weekday = eventDate.toLocaleDateString("fr-FR", {
        weekday: "long",
      });

      return {
        date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
        time: formattedTime,
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        fullDate: eventDate,
      };
    } catch {
      return { date: dateString, time: null, weekday: null };
    }
  }, []);

  const statusConfig = useMemo(
    () => getStatusConfig(event.status),
    [event.status, getStatusConfig]
  );

  const createdAt = new Date(event.createdAt!);
  const timeAgo = getTimeAgo(createdAt);
  const eventDateTime = formatEventDateTime(event.details.date);

  const shouldShowReadMore =
    event.description && event.description.length > 200;

  return (
    <div className="bg-white w-full max-w-4xl mx-auto mb-8 rounded-none sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <EventCardProfile urlProfile="" username={event.organizer.username} />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {event.organizer.username}
            </h4>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 ${statusConfig.bgColor} rounded-full`}
        >
          <div
            className={`w-2 h-2 ${statusConfig.dotColor} rounded-full animate-pulse`}
          />
          <span className={`text-xs font-medium ${statusConfig.textColor}`}>
            {statusConfig.text}
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Date et heure améliorées */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <div className="bg-blue-100 p-2 rounded-md flex-shrink-0">
              <Calendar className="text-blue-600 w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Date & Heure
              </p>
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {eventDateTime.date}
              </p>
              {eventDateTime.time && (
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    {eventDateTime.time}
                  </span>
                </div>
              )}
            </div>
          </div>

          {event.details.platform && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <div className="bg-purple-100 p-2 rounded-md">
                <Laptop className="text-purple-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Plateforme
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {event.details.platform}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p
            className={`text-gray-600 text-sm leading-relaxed ${
              !isDescriptionExpanded && shouldShowReadMore ? "line-clamp-3" : ""
            }`}
          >
            {event.description}
          </p>
          {shouldShowReadMore && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-2"
            >
              {isDescriptionExpanded ? "Réduire" : "Lire plus"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            <Tag className="w-3 h-3" /> {event.type}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <LikeEventButton
              eventId={event.id}
              isLiked={event.isLiked}
              initialLikesCount={event.stats?.likes}
            />
            <button
              onClick={handleToggleComments}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${
                commentsIsOpen
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="sm:inline">{commentsCount}</span>
            </button>
            <SaveEventButton
              eventId={event.id}
              isSaved={event.isSaved}
              className="text-gray-500 hover:text-gray-700"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${
                isLinkCopied
                  ? "bg-green-100 text-green-700"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isLinkCopied ? "Copié !" : "Copier le lien"}
              </span>
            </button>
          </div>
        </div>

        <a
          href={event.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-2 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105 shadow-md"
        >
          🚀 <span className="sm:inline">Accéder à l'événement</span>
        </a>
      </div>

      {commentsIsOpen && (
        <div className="border-t border-gray-100">
          <EventComments
            eventId={event.id}
            onClose={() => setCommentsIsOpen(false)}
            onCommentsCountChange={setCountCount}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard;
