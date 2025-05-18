import React, { useEffect, useState } from "react";
// Or use any icon library you prefer
import { TiDelete } from "react-icons/ti";
import FileTypeBadge from "../badge/page";

type FilePreviewCardProps = {
  file: File;
  onClear: () => void;
};

// function getFileTypeLabel(mimeType: string): string {
//     const type = mimeType.split("/")[1];

//     switch (type) {
//       case "plain":
//         return "TXT";
//       case "pdf":
//         return "PDF";
//       case "msword":
//       case "vnd.openxmlformats-officedocument.wordprocessingml.document":
//         return "DOC";
//       default:
//         return type.toUpperCase();
//     }
//   }

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({ file, onClear }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProgress(0);
    setIsReady(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100); // update every 100ms

    return () => clearInterval(interval);
  }, [file]); // rerun when file changes

  return (
    <div className="relative bg-blue-900 text-white rounded-md p-4 w-64 shadow-md w-[100%]">
      {/* Clear Icon */}
      <button
        onClick={onClear}
        className="absolute top-2 right-2 text-white hover:text-red-400"
        aria-label="Clear"
      >
        <TiDelete size={18} />
      </button>

      {/* File Icon */}
      <div className="flex flex-col items-center mt-2">
        <div className="text-center mb-2">
          <div className="text-sm border border-white px-2 py-1 rounded">
            {/* PDF {file.type} */}
            {/* {getFileTypeLabel(file.type)} Show label like PDF, TXT, DOC */}
            <FileTypeBadge mimeType={file.type} />
          </div>
        </div>

        {/* Filename */}
        <div className="truncate text-sm">{file.name}</div>

        {/* Green Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded mt-3 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage value Show % only while not ready */}
        {!isReady && (
          <div className="text-xs text-white-700 mt-1">{progress}%</div>
        )}

        {/* Status */}
        <div className="mt-2 text-sm font-bold">
          {isReady ? "Ready" : "Uploading..."}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewCard;
