"use client";
import { Button } from "../ui/button";
import { CirclePlus, CircleMinus } from "lucide-react";
import { useState } from "react";
import { randomStr } from "@/utils/random";

import { pdfjs, Document } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PDFDocument from "./PDFDocument";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFClient() {
  const [pdfWidth, setPdfWidth] = useState(200);
  const [pdfList, setPdfList] = useState([]);
  // const [pdfFile, setPdfFile] = useState(null);
  const [pdfFile, setPdfFile] = useState("/lhh.pdf");

  function onDocumentLoadSuccess(p) {
    setPdfList(
      Array.from({ length: p._pdfInfo.numPages }).map((_, i) => ({
        id: randomStr(i + 1),
        rotate: 0,
      }))
    );
  }

  function downloadPdf() {
    const doc = pdfjs.getDocument(pdfFile);
    console.log("doc: ", doc);
    // const canvasArr = document.querySelectorAll("canvas");
    // console.log("canvasArr: ", canvasArr);
    // const PDF = new jsPDF("p", "pt", "a4");
    // const width = PDF.internal.pageSize.getWidth();
    // const height = PDF.internal.pageSize.getHeight();
    // canvasArr.forEach((canvas, i) => {
    //   PDF.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, width, height);
    //   if (i < canvasArr.length - 1) {
    //     PDF.addPage();
    //   }
    // });
    // PDF.save(`myPdf.pdf`);
  }

  if (!pdfFile) {
    return (
      <>
        <label
          htmlFor="pdf-file-input"
          className="mx-auto w-[275px] h-[350px] bg-white p-4 border-dashed border border-gray-400 flex justify-center items-center cursor-pointer"
        >
          Click to upload or drag and drop
        </label>
        <input
          id="pdf-file-input"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            setPdfFile(e.target.files[0]);
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-x-4">
        <Button
          onClick={() => {
            setPdfList((list) =>
              list.map((item) => ({ ...item, rotate: item.rotate + 90 }))
            );
          }}
        >
          Rotate all
        </Button>
        <Button
          variant="secondary"
          onClick={() => setPdfFile(null)}
        >
          Remove PDF
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPdfWidth((v) => v + 50)}
        >
          <CirclePlus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPdfWidth((v) => v - 50)}
        >
          <CircleMinus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center">
        <Document
          file={pdfFile}
          renderMode="canvas"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <PDFDocument
            pdfList={pdfList}
            setPdfList={setPdfList}
            pdfWidth={pdfWidth}
          />
        </Document>
      </div>
      <div className="flex justify-center">
        <Button onClick={downloadPdf}>Download</Button>
      </div>
    </>
  );
}
