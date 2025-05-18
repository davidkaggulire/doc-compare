import React from "react";

interface DifferencesTableProps {
  differences: Record<string, [string, string]>;
  file1Name: string;
  file2Name: string; 
}

const DifferencesTable: React.FC<DifferencesTableProps> = ({
  differences,
  file1Name,
  file2Name,
}) => {
  const keys = Object.keys(differences);

  console.log("hello got")
  console.log(file1Name, file2Name)

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-4 w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>👥</span> Top Differences
      </h2>

      <table className="w-full text-left text-sm">
        <thead className="text-neutral-400 border-b border-neutral-700">
          <tr>
            <th className="py-2">Key</th>
            <th className="py-2 text-white">{file1Name}</th>
            <th className="py-2 text-white">{file2Name}</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => {
            const [file1, file2] = differences[key];
            return (
              <tr key={key} className="border-b border-neutral-800">
                <td className="py-2">{key}</td>
                <td className="py-2 font-semibold">{file1}</td>
                <td className="py-2 font-semibold">{file2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DifferencesTable;
