import { useState } from "react";
import CreateEventModal from "./components/Event/CreateEventModal";
import FloatButton from "./components/FloatButton";
import Header from "./components/Header";
import Main from "./components/Main";
import { useCreateEvent } from "../../hooks/useEvent";
import type { CreateEventPayload } from "../../types/event";
import SuccessPopup from "../../components/shared/PopUp";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdEventTitle, setCreatedEventTitle] = useState("");

  const createEventMutation = useCreateEvent();

  const handleCreateEvent = (
    eventData: Omit<
      CreateEventPayload,
      "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved"
    >
  ) => {
    createEventMutation.mutate(eventData, {
      onSuccess: () => {
        setCreatedEventTitle(eventData.title);
        closeModal();
        setTimeout(() => {
          setShowSuccessPopup(true);
        }, 200);
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
    createEventMutation.reset();
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setCreatedEventTitle("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full bg-gray-50 m-0">
      <Header onSearch={handleSearch} />
      <Main openModal={openModal} searchQuery={searchQuery} />
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

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={closeSuccessPopup}
        eventTitle={createdEventTitle}
      />
    </div>
  );
}
