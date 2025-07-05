import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import eventApi from "../../../../api/event";
import EmptyState from "../../../../components/shared/EmptyState";
import ErrorState from "../../../../components/shared/ErrorState";
import Loader from "../../../../components/shared/Loader";

interface ListEventCardProps {
  searchQuery: string;
}

const ListEventCard = ({ searchQuery }: ListEventCardProps) => {
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

  const filteredEvents = events?.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("data", events);
  console.log("filteredData", filteredEvents);
  if (isLoading) return <Loader />;
  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }
  if (!filteredEvents?.length) {
    const message = searchQuery
      ? `Aucun événement trouvé pour "${searchQuery}"`
      : "Aucun événement disponible pour le moment.";
    return <EmptyState description={message} onCreateEvent={() => {}} />;
  }

  return (
    <ul className="my-10 ">
      {filteredEvents.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};
export default ListEventCard;
