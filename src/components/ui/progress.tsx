import React from "react";

interface ProgressProps {
  value: number; // From 0 to 100
  color?: string; // Tailwind color class like 'bg-green-500'
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  color = "bg-green-500",
}) => {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
