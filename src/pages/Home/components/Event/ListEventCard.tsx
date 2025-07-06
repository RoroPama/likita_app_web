import EventCard from "./EventCard";
import EmptyState from "../../../../components/shared/EmptyState";
import ErrorState from "../../../../components/shared/ErrorState";
import Loader from "../../../../components/shared/Loader";
import type { Event } from "../../../../types/event";

interface ListEventCardProps {
  searchQuery: string;
  selectedCategory: string;
  openModal: () => void;
  events: Event[] | undefined;
  isLoading: boolean;
  refetch: () => void;
  error: Error | null;
}

const ListEventCard = ({
  searchQuery,
  selectedCategory,
  openModal,
  error,
  events,
  isLoading,
  refetch,
}: ListEventCardProps) => {
  const filteredEvents = events?.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" || event.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

    return (
      <EmptyState
        description={message}
        onCreateEvent={() => {
          openModal();
        }}
      />
    );
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
