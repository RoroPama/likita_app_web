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
  color = "#ffffff", // pour fond bleu du bouton
}) => (
  <div
    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    style={{ borderTopColor: color }}
  />
);

export const DotLoader: React.FC<{ color?: string }> = ({
  color = "#3b82f6",
}) => (
  <div className="flex space-x-2">
    {[0, 150, 300].map((delay, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full animate-bounce"
        style={{
          backgroundColor: color,
          animationDelay: `${delay}ms`,
        }}
      />
    ))}
  </div>
);

export const PulseLoader: React.FC<{ size?: number; color?: string }> = ({
  size = 12,
  color = "#3b82f6",
}) => (
  <div
    style={{ width: size, height: size, backgroundColor: color }}
    className="rounded-full animate-pulse"
  />
);

export const BarLoader: React.FC<{ width?: number; color?: string }> = ({
  width = 192,
  color = "#3b82f6",
}) => (
  <div style={{ width }} className="h-1 bg-gray-200 rounded overflow-hidden">
    <div
      className="h-full rounded animate-pulse"
      style={{
        backgroundColor: color,
        animation: "loading 1.5s ease-in-out infinite",
      }}
    />
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  </div>
);

export default Loader;
