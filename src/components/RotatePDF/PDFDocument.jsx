"use client";

import { RefreshCcw } from "lucide-react";
import { Page, useDocumentContext } from "react-pdf";

function downloadFile(data, fileName, fileType) {
  const blob = new Blob([data], {
    type: fileType,
  });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = "display: none";

  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export default function PDFDocument({ pdfList, setPdfList, pdfWidth }) {
  const context = useDocumentContext();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {pdfList.map((item, index) => (
          <div
            key={item.id}
            className="relative bg-white hover:bg-gray-100 p-4 cursor-pointer"
            onClick={() => {
              pdfList[index].rotate += 90;
              setPdfList([...pdfList]);
            }}
          >
            <Page
              pageNumber={index + 1}
              width={pdfWidth}
              rotate={item.rotate}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
            <div
              className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                pdfList[index].rotate += 90;
                setPdfList([...pdfList]);
              }}
            >
              <RefreshCcw className="w-3 h-3" />
            </div>
            <div className="text-center text-sm">{index + 1}</div>
          </div>
        ))}
        <div
          onClick={async () => {
            // const doc = pdfjs.getDocument(pdfList[0].id);
            // const data = await context.pdf.getData();
            const data = await context.pdf.saveDocument();
            console.log("data: ", data);

            downloadFile(data, "newPdf.pdf", "application/pdf");

            // console.log("data: ", data);
          }}
        >
          download
        </div>
      </div>
    </>
  );
}
