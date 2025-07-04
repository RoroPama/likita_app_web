import { useState } from "react";
import CreateEventModal from "./components/Event/CreateEventModal";
import FloatButton from "./components/FloatButton";
import Header from "./components/Header";
import Main from "./components/Main";
import { useCreateEvent } from "../../hooks/useEvent";
import type { CreateEventPayload } from "../../types/event";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createEventMutation = useCreateEvent();

  const handleCreateEvent = (
    eventData: Omit<
      CreateEventPayload,
      "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved"
    >
  ) => {
    createEventMutation.mutate(eventData, {
      onSuccess: () => {
        closeModal();
      },
      onError: (error) => {
        alert(
          `Erreur lors de la création de l'événement: ${
            (error as Error).message
          }`
        );
        console.error(error);
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    createEventMutation.reset(); // Réinitialise l'état de la mutation lors de la fermeture
  };

  return (
    <div className="w-full bg-gray-50 m-0">
      <Header />
      <Main />
      <FloatButton onClick={openModal} />
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateEvent={handleCreateEvent}
        isLoading={createEventMutation.isPending}
        error={
          createEventMutation.isError
            ? (createEventMutation.error as Error).message
            : null
        }
      />
    </div>
  );
}
