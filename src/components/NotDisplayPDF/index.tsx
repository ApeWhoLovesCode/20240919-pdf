import { Page, Document } from "react-pdf";
import { PdfFileItem } from "../RotatePDF/type";

export default function NotDisplayPDF({
  pdfFile,
  pdfList,
}: {
  pdfFile: any;
  pdfList: PdfFileItem[];
}) {
  // const download = () => {
  //   const notDisplayContainer = document.querySelector(
  //     "#not-display-pdf-container"
  //   );
  //   const canvasArr = notDisplayContainer.querySelectorAll("canvas");
  //   console.log("canvasArr: ", canvasArr);
  //   const PDF = new jsPDF("p", "pt", "a4");
  //   const width = PDF.internal.pageSize.getWidth();
  //   const height = PDF.internal.pageSize.getHeight();
  //   canvasArr.forEach((canvas, i) => {
  //     PDF.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, width, height);
  //     if (i < canvasArr.length - 1) {
  //       PDF.addPage();
  //     }
  //   });
  //   PDF.save(`myPdf.pdf`);
  // };
  return (
    <div
      id="not-display-pdf-container"
      className="fixed -top-[2000px] -left-[2000px] w-[1000px] hidden"
    >
      <Document
        file={pdfFile}
        renderMode="canvas"
      >
        {pdfList.map((item, index) => (
          <Page
            key={item.id}
            pageNumber={index + 1}
            rotate={item.rotate}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
