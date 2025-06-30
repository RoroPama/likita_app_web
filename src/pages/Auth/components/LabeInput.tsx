import React from "react";
import { Eye, EyeOff } from "lucide-react";
type props = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

const LabelInput: React.FC<props> = ({ label, type, placeholder, name }) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  const hidePassword = () => setShowPassword((t) => !t);

  const eyeIcon = showPassword ? (
    <Eye onClick={hidePassword} />
  ) : (
    <EyeOff onClick={hidePassword} />
  );
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          minLength={isPassword ? 8 : undefined}
          name={name}
          required
          type={showPassword ? "text" : type}
          placeholder={
            isPassword
              ? "••••••••"
              : type === "email"
              ? "rolic@gmail.com"
              : placeholder
          }
          className="w-full  p-3 rounded-lg border border-gray-300 focus:border-2 focus:right-2 focus:border-blue-400 transition-colors duration-200    outline-none"
        />

        <button
          type="button"
          className="absolute top-1/4 right-3 text-gray-500  "
        >
          {isPassword && eyeIcon}
        </button>
      </div>
    </div>
  );
};

export default LabelInput;
