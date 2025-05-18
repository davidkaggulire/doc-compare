import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-md bg-white dark:bg-neutral-900 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};
