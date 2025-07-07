import React from "react";
import { Bookmark } from "lucide-react";
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
      className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${className}`}
    >
      <Bookmark
        size={20}
        strokeWidth={2}
        className={saved ? "text-blue-600" : "text-gray-500"}
        fill={saved ? "currentColor" : "none"}
      />
      <span className="hidden sm:inline text-sm font-medium text-gray-700">
        {saved ? "Sauvegardé" : "Sauvegarder"}
      </span>
    </button>
  );
};

export default SaveEventButton;
