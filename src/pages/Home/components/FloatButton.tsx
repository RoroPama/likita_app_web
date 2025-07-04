import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

const FloatButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed 
        bottom-4 right-4 
        sm:bottom-6 sm:right-6 
        w-12 h-12 
        sm:w-14 sm:h-14 
        bg-gradient-to-r from-blue-600 to-blue-700 
        text-white 
        rounded-full 
        shadow-lg hover:shadow-xl 
        transform hover:scale-105 active:scale-95
        transition-all duration-200 
        flex items-center justify-center 
        z-50 
        group
        touch-manipulation
        will-change-transform
        safe-area-padding
      "
      style={{
        // Ajout de padding pour les safe areas (iPhone avec encoche)
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
      aria-label="Créer un événement"
    >
      <Plus className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-90 duration-200" />

      {/* Tooltip - masqué sur mobile, visible sur desktop */}
      <div
        className="
        absolute right-full mr-3 
        px-3 py-2 
        bg-gray-800 text-white 
        text-sm rounded-lg 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 
        whitespace-nowrap 
        pointer-events-none
        hidden sm:block
      "
      >
        Créer un événement
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-800 rotate-45 transform -translate-y-1/2"></div>
      </div>
    </button>
  );
};

export default FloatButton;
