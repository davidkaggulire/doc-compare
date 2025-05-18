// utils/pdfGenerator.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateComparisonPDF({
  differences,
  file1,
  file2,
}: {
  differences: Record<string, [string, string]>;
  file1: string;
  file2: string;
}) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Document Comparison Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`File 1: ${file1}`, 14, 30);
  doc.text(`File 2: ${file2}`, 14, 38);

  autoTable(doc, {
    head: [["Attribute", file1, file2]],
    body: Object.entries(differences).map(([key, [val1, val2]]) => [
      key,
      val1 || "N/A",
      val2 || "N/A",
    ]),
    startY: 50,
  });

  doc.save("comparison_report.pdf");
}
