import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import eventApi from "../../../../api/event";
import EmptyState from "../../../../components/shared/EmptyState";
import ErrorState from "../../../../components/shared/ErrorState";
import Loader from "../../../../components/shared/Loader";

interface ListEventCardProps {
  searchQuery: string;
  selectedCategory: string;
}

const ListEventCard = ({
  searchQuery,
  selectedCategory,
}: ListEventCardProps) => {
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEventWithUsers,
    staleTime: 5 * 60 * 1000,
  });

  const filteredEvents = events?.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" || event.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  console.log("data", events);
  console.log("filteredData", filteredEvents);
  console.log("selectedCategory", selectedCategory);

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  if (!filteredEvents?.length) {
    let message = "Aucun événement disponible pour le moment.";

    if (searchQuery && selectedCategory !== "Tous") {
      message = `Aucun événement trouvé pour "${searchQuery}" dans la catégorie "${selectedCategory}"`;
    } else if (searchQuery) {
      message = `Aucun événement trouvé pour "${searchQuery}"`;
    } else if (selectedCategory !== "Tous") {
      message = `Aucun événement trouvé dans la catégorie "${selectedCategory}"`;
    }

    return <EmptyState description={message} onCreateEvent={() => {}} />;
  }

  return (
    <ul className="my-10">
      {filteredEvents.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};

export default ListEventCard;
