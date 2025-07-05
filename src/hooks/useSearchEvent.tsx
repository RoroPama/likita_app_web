import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import eventApi from "../api/event";

export const useEventSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Récupère tous les événements
  const {
    data: allEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEventWithUsers,
  });

  // Filtre les événements selon le terme de recherche
  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim() || !allEvents) return allEvents;

    return allEvents.filter((event) =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allEvents, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearchActive(term.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  return {
    searchTerm,
    isSearchActive,
    filteredEvents,
    isLoading,
    error,
    handleSearch,
    clearSearch,
  };
};
