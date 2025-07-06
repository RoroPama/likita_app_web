import { useState } from "react";
import { ArrowLeft, Search, Bookmark } from "lucide-react";
import ListEventCard from "../Home/components/Event/ListEventCard";
import { useQuery } from "@tanstack/react-query";
import eventApi from "../../api/event";

const SavedEventsPage = () => {
  const {
    data: events = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEventWithUsers,
    staleTime: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "savedAt">("date");

  const eventsSaved = events.filter((event) => event.isSaved);
  const categories = [
    { id: "Tous", label: "Tous", count: eventsSaved.length },
    {
      id: "Technologie",
      label: "Technologie",
      count: eventsSaved.filter((e) => e.type === "Technologie").length,
    },
    {
      id: "Art & Culture",
      label: "Art & Culture",
      count: eventsSaved.filter((e) => e.type === "Art & Culture").length,
    },
    {
      id: "Business",
      label: "Business",
      count: eventsSaved.filter((e) => e.type === "Business").length,
    },
    {
      id: "Sport",
      label: "Sport",
      count: eventsSaved.filter((e) => e.type === "Sport").length,
    },
    {
      id: "Networking",
      label: "Networking",
      count: eventsSaved.filter((e) => e.type === "Networking").length,
    },
    {
      id: "Formation",
      label: "Formation",
      count: eventsSaved.filter((e) => e.type === "Formation").length,
    },
    {
      id: "Conférence",
      label: "Conférence",
      count: eventsSaved.filter((e) => e.type === "Conférence").length,
    },
    {
      id: "Atelier",
      label: "Atelier",
      count: eventsSaved.filter((e) => e.type === "Atelier").length,
    },
    {
      id: "Autre",
      label: "Autre",
      count: eventsSaved.filter((e) => e.type === "Autre").length,
    },
  ];

  const filteredEvents = eventsSaved
    .filter((event) => {
      const matchesCategory =
        selectedCategory === "Tous" || event.type === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.platform
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.details.date).getTime();
      const dateB = new Date(b.details.date).getTime();

      if (sortBy === "date") {
        return dateA - dateB;
      } else {
        const savedAtA = new Date(a.createdAt || "2000-01-01").getTime();
        const savedAtB = new Date(b.createdAt || "2000-01-01").getTime();
        return savedAtB - savedAtA;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.history.back()}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-blue-600" />{" "}
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Événements Enregistrés
              </h1>
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-bold">
                {" "}
                {eventsSaved.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-200 bg-white border border-gray-300"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "savedAt")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            >
              <option value="date">Trier par date</option>
              <option value="savedAt">Trier par enregistrement</option>
            </select>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun événement enregistré
            </h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== "Tous"
                ? "Aucun événement ne correspond à vos critères"
                : "Vous n'avez pas encore enregistré d'événements"}
            </p>
          </div>
        ) : (
          <ListEventCard
            error={error}
            events={eventsSaved}
            isLoading={isLoading}
            refetch={refetch}
            searchQuery={searchQuery}
            openModal={() => {}}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  );
};

export default SavedEventsPage;
