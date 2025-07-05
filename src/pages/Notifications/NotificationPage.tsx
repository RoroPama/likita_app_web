import React, { useState } from "react";
import { ArrowLeft, Info, Gift, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: "welcome" | "event" | "social" | "system" | "promo";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "welcome",
    title: "🎉 Bienvenue sur Likita !",
    message:
      "Félicitations ! Vous faites maintenant partie de la communauté Likita. Découvrez des événements incroyables près de chez vous et connectez-vous avec des personnes partageant les mêmes passions.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    icon: <Gift className="w-5 h-5 text-blue-600" />,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread">("all");
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "unread") return !notification.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  //   const markAllAsRead = () => {
  //     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  //   };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationStyle = (type: Notification["type"]) => {
    switch (type) {
      case "welcome":
        return "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50";
      case "event":
        return "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50";
      case "social":
        return "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50";
      case "system":
        return "border-l-4 border-l-gray-500 bg-gradient-to-r from-gray-50 to-slate-50";
      case "promo":
        return "border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-rose-50";
      default:
        return "border-l-4 border-l-gray-300 bg-gray-50";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Retour à la page précédente"
              >
                <ArrowLeft className="w-6 h-6 text-blue-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                  {unreadCount}
                </span>
              )}
            </div>

            {/* {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
              >
                Tout marquer lu
              </button>
            )} */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Toutes ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedFilter("unread")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "unread"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Non lues ({unreadCount})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <ArrowLeft className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedFilter === "unread"
                  ? "Aucune notification non lue"
                  : "Aucune notification"}
              </h3>
              <p className="text-gray-500">
                {selectedFilter === "unread"
                  ? "Vous êtes à jour avec toutes vos notifications !"
                  : "Vos notifications apparaîtront ici"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer group ${
                  !notification.read ? "ring-2 ring-blue-100" : ""
                } ${getNotificationStyle(notification.type)}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {notification.icon || (
                      <Info className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={`text-base sm:text-lg font-semibold mb-2 ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${
                            !notification.read
                              ? "text-gray-700"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>

                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 ml-3 mt-2"></div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="flex items-center space-x-1 text-xs sm:text-sm text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
