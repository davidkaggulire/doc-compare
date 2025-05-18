import React from "react";

interface SemiCircleProgressProps {
  percentage: number; // 0 to 100
  size?: number;       // width/height of full circle
  strokeWidth?: number;
}

const getColor = (percentage: number) => {
  if (percentage >= 80) return "#16a34a"; // green
  if (percentage >= 50) return "#facc15"; // yellow
  return "#ef4444"; // red
};

export const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  percentage,
  size = 200,
  strokeWidth = 15,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // semi-circle
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <svg width={size} height={size / 2}>
      {/* Background semi-circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e5e7eb" // gray-200
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(180, ${size / 2}, ${size / 2})`}
      />

      {/* Foreground arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={getColor(clamped)}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(180, ${size / 2}, ${size / 2})`}
      />

      {/* Percentage Text */}
      <text
        x="50%"
        y="90%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fill="#374151" // gray-700
        fontWeight="bold"
      >
        {clamped}%
      </text>
    </svg>
  );
};
