"use client";

import React, { useState } from "react";
import FileUploadZone from "../files/page";
import { useRouter } from "next/navigation";

// running local app
// const part: string = "http://localhost:5000/";

// using fly.io
const part: string = "https://pdfchecker.fly.dev/";

// using render service
// const part: string = "https://pdfchecker.onrender.com/";

const url: string = `${part}compare`;

export default function FormComparer() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const router = useRouter();

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello there");

    if (!file1 || !file2) {
      alert("Please upload both files for comparison.");
      return;
    }

    // Call your compare function here
    console.log("Comparing files:", file1.name, file2.name);
    // compareFiles(file1, file2); // your logic here

    try {
      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Comparison failed");
      }

      const data = await response.json();
      console.log("Comparison result:", data);

      // ensures no file is stored on the server - thus GDPR rules are kept.
      await fetch(`${part}delete-files`, {
        method: "POST",
      });

      // Convert to string and encode to pass in URL (for simple demo)
      const encodedData = encodeURIComponent(JSON.stringify(data));
      const encodedFile1 = encodeURIComponent(file1.name);
      const encodedFile2 = encodeURIComponent(file2.name);
      console.log(encodedData);
      console.log("here we go");
      console.log(encodedFile1, encodedFile2);
      router.push(
        `/analytics?result=${encodedData}&file1=${encodedFile1}&file2=${encodedFile2}`
      );

      // router.push(href)
      // TODO: handle or display result in UI
    } catch (error) {
      console.error("Error during document comparison:", error);
      alert("An error occurred while comparing the documents.");
    }
  };

  return (
    <form onSubmit={formHandler}>
      <div className="border-4 border-gray-500 rounded-md flex flex-col items-center justify-center gap-8 px-8 border-double">
        <div className="text-4xl mt-8 flex flex-row justify-center gap-4">
          <div>
            <FileUploadZone
              text="Drag & drop first file here"
              onFileSelect={setFile1}
            />
          </div>
          <div>
            <FileUploadZone
              text="Drag & drop second file here"
              onFileSelect={setFile2}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-3 py-3 border-1 border-blue-500 rounded-sm bg-blue-500 text-xl text-white w-[100%]"
        >
          Compare documents
        </button>
      </div>
    </form>
  );
}
