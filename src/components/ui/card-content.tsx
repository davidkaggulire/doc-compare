import React from "react";
import clsx from "clsx";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "p-4", // base padding for content
        className
      )}
    >
      {children}
    </div>
  );
};
