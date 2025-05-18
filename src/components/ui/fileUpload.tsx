"use client";

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { BsDownload } from "react-icons/bs";
import { PiFolderThin } from "react-icons/pi";
import FilePreviewCard from "./filePreviewCard";


type FileUploadZoneProps = {
  text: string;
  onFileSelect: (file: File | null) => void;
};

export default function FileUploadZone({
  text,
  onFileSelect,
}: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // console.log("Dropped files:", acceptedFiles);
    // You can now use these files elsewhere (e.g., send to a compare function)

    const file = acceptedFiles[0] || null;
    // console.log("file type is ",file.type)
    onFileSelect(file);
  };

  const handleClear = () => {
    setFiles([]);
    // console.log("file cleared");
    onFileSelect(null);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/msword": [".doc"], // for older Word files
        "text/plain": [".txt"],
      }}
      maxFiles={1}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="p-6 border-2 border-dashed border-gray-400 rounded-xl bg-green-50 text-center">
          <div {...getRootProps({ className: "cursor-pointer w-95" })}>
            <input {...getInputProps()} />
            {/* <p className="text-lg">
              {text}. Only .doc, .docx, .pdf, and .txt files are allowed
            </p> */}
            {files.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-8">
                <BsDownload className="bold" />
                <p className="text-lg">{text}</p>
                <p className="text-lg">Or</p>
                <div className="flex flex-row justify-center items-center">
                  <PiFolderThin size={80} />
                  <p className="text-base hover:text-sky-500">
                    Browse device (Only .doc, .docx, .pdf, and .txt files are
                    allowed)
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* this also works */}
          {/* {files.length > 0 && (
            <aside className="mt-4">
              <h4 className="font-semibold">Selected Files:</h4>
              <ul>
                {files.map((file) => (
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleClear}
                className="mt-2 text-sm text-red-500 underline hover:text-red-700"
              >
                Clear
              </button>
            </aside>
          )} */}

          {files.length > 0 && (
            <FilePreviewCard file={files[0]} onClear={handleClear} />
          )}
        </section>
      )}

      {/* {({ getRootProps, getInputProps }) => (
        <section className="p-4 border-2 border-dashed border-gray-400 rounded-xl bg-green-50 text-center w-64">
          <div {...getRootProps({ className: "cursor-pointer" })}>
            <input {...getInputProps()} />
            <p className="text-md">{files ? "File selected:" : text}</p>
            {files && (
              <div className="mt-2 text-sm text-gray-800">{files.name}</div>
            )}
          </div>
          {files && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 text-sm text-red-500 underline hover:text-red-700"
            >
              Clear
            </button>
          )}
        </section>
      )} */}
    </Dropzone>
  );
}
