"use client";

import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card-content";
import { useSearchParams } from "next/navigation";

import { FaLongArrowAltRight } from "react-icons/fa";
import DifferencesTable from "../difference/page";
import { SemiCircleProgress } from "@/components/ui/semi-circle";
import { generateComparisonPDF } from "@/utils/pdfGenerator";
// import { useRouter } from "next/navigation";

function differenceCount(val: string) {
  const parsed = JSON.parse(val as string);

  // Access the "differences" object
  const differences = parsed.differences;

  // Count the number of keys
  const differenceCount = Object.keys(differences).length;

  console.log("Number of differences:", differenceCount);
  return differenceCount;
}

export default function AnalyticsPage() {
  //   const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  const result = searchParams.get("result");
  console.log(typeof result);

  const file1Name = searchParams.get("file1");
  const file2Name = searchParams.get("file2");

  console.log("gendi gendi");
  console.log(file1Name, file2Name);

  const value = JSON.stringify(JSON.parse(result as string));
  console.log("the value is ", value);

  const resultData = JSON.parse(result as string);

  const parsed = differenceCount(result as string);
  let percent: number = 0;

  if (parsed === 0) {
    percent = 100;
  } else if (parsed <= 3) {
    percent = 99.9;
  } else {
    percent = 0.0;
  }

  const handleDownloadPDF = () => {
    if (resultData?.differences && file1Name && file2Name) {
      generateComparisonPDF({
        differences: resultData.differences,
        file1: file1Name,
        file2: file2Name,
      });
    }
  };

  return (
    <div className="font-mono">
      <nav className="flex flex-row p-4 justify-between bg-blue-500 text-white text-xl">
        <div className="text-2xl">Doc-Compare</div>
        <a>About</a>
        <button>Try Out</button>
      </nav>
      <div className="flex flex-row justify-between p-6">
        <h2 className="p-6 font-bold text-3xl">Analytics Overview</h2>
        <button
          onClick={handleDownloadPDF}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Card className="bg-green-100 col-span-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Total Differences</h3>
              <FaLongArrowAltRight />
            </div>
            <p className="text-7xl font-bold">{parsed}</p>
          </CardContent>
        </Card>

        {/* Files compared */}
        <Card className="bg-purple-100 col-span-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Files Compared</h3>
              <FaLongArrowAltRight />
            </div>
            <div className="mt-4">
              <div className="w-full h-24 bg-blue-300 rounded p-4 m-2 text-lg font-bold">
                {file1Name || ""}
              </div>
              <div className="w-full h-24 bg-violet-300 rounded m-2 p-4 text-lg font-bold">
                {file2Name || ""}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Similarity Score */}
        <Card className="bg-gray-100 col-span-1">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              File Similarity Score
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center">
              <SemiCircleProgress percentage={percent} />
            </div>
          </CardContent>
        </Card>

        {/* Difference Table */}
        <Card className="bg-white col-span-1 md:col-span-2 lg:col-span-1">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">File Details</h2>
            <DifferencesTable
              differences={resultData.differences}
              file1Name={file1Name || ""}
              file2Name={file2Name || ""}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
