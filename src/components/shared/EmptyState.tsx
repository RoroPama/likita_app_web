import { Calendar, Plus } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onCreateEvent?: () => void;
  showCreateButton?: boolean;
}

const EmptyState = ({
  title = "Aucun événement trouvé",
  description = "Il n'y a pas encore d'événements disponibles. Soyez le premier à en créer un !",
  onCreateEvent,
  showCreateButton = true,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-blue-50 rounded-full p-4 mb-6">
        <Calendar className="w-12 h-12 text-blue-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>

      {showCreateButton && onCreateEvent && (
        <button
          onClick={onCreateEvent}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Créer un événement
        </button>
      )}
    </div>
  );
};

export default EmptyState;
