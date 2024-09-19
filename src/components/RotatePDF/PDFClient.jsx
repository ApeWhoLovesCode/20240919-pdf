"use client";
import { randomStr } from "@/utils/random";
import { Button } from "../ui/button";
import { CirclePlus, CircleMinus, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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
          </div>
        </Document>
      </div>
      <div className="flex justify-center">
        <Button>Download</Button>
      </div>
    </>
  );
}
