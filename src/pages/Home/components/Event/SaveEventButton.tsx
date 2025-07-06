import React from "react";
import { useSave } from "../../../../hooks/useSave";

interface SaveEventButtonProps {
  eventId: string;
  isSaved?: boolean;
  className?: string;
}

const SaveEventButton: React.FC<SaveEventButtonProps> = ({
  eventId,
  isSaved = false,
  className = "",
}) => {
  const {
    isSaved: saved,
    toggleSave,
    loading,
  } = useSave({
    eventId,
    initialIsSaved: isSaved,
  });

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        saved
          ? "bg-gray-100 text-blue-600"
          : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
      } ${className}`}
    >
      <span className="text-lg">{saved ? "📌" : "🔖"}</span>
      <span className="hidden sm:inline text-sm font-medium">
        {saved ? "Sauvegardé" : "Sauvegarder"}
      </span>
    </button>
  );
};

export default SaveEventButton;
