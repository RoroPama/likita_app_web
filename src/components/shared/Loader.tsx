import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  color = "#3b82f6",
  text = "Chargement...",
  fullScreen = false,
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-4 rounded-full animate-spin`}
          style={{ borderTopColor: color }}
        />
        {text && (
          <p
            className={`${textSizeClasses[size]} font-medium`}
            style={{ color }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export const MiniLoader: React.FC<{ color?: string }> = ({
  color = "#ffffff",
}) => (
  <div
    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    style={{ borderTopColor: color }}
  />
);

export default Loader;
