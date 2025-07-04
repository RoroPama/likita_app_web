import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
};

const ErrorState = ({
  message = "Une erreur s'est produite",
  onRetry,
  showRetryButton = true,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-50 rounded-full p-4 mb-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops ! Quelque chose s'est mal passé
      </h3>

      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>

      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
      )}
    </div>
  );
};

export default ErrorState;
