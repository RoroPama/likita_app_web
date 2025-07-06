const SuccessPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-xs w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
        <div className="p-5 text-center">
          <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Événement créé !
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="font-medium">
              {" "}
              Votre évenement a été créé avec succès
            </span>
          </p>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Parfait ✨
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 shadow-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
