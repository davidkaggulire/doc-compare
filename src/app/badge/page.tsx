// FileTypeBadge.tsx
import React from "react";
import {
  BsFiletypePdf,
  BsFiletypeDoc,
  BsFiletypeTxt,
  BsFileEarmarkTextFill,
} from "react-icons/bs";

interface FileTypeBadgeProps {
  mimeType: string;
}

export default function FileTypeBadge({ mimeType }: FileTypeBadgeProps) {
  const type = mimeType.split("/")[1];

  switch (type) {
    case "pdf":
      return (
        <span className="flex items-center gap-1 text-red-600">
          <BsFiletypePdf size={40} className="text-white"/>
        </span>
      );
    case "msword":
    case "vnd.openxmlformats-officedocument.wordprocessingml.document":
      return (
        <span className="flex items-center gap-1 text-blue-600">
          <BsFiletypeDoc size={40} className="text-white"/>
        </span>
      );
    case "plain":
      return (
        <span className="flex items-center gap-1 text-gray-700">
          <BsFiletypeTxt size={40} className="text-white" />
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1 text-gray-500">
          <BsFileEarmarkTextFill size={40}/> {type.toUpperCase()}
        </span>
      );
  }
}
