"use client";
import { Button } from "../ui/button";
import { CirclePlus, CircleMinus } from "lucide-react";
import { useState, useRef } from "react";
import { randomStr } from "@/utils/random";

import { pdfjs, Document } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PDFPage from "./PDFPage";
import { download } from "@/utils/file";
import jsPDF from "jspdf";
import { PdfFileItem } from "./type";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types.js";
import NotDisplayPDF from "../NotDisplayPDF";
import sleep from "@/utils/sleep";

// 解决打包的报错问题 https://github.com/wojtekmaj/react-pdf/issues/1855#issuecomment-2318454146
pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.min.mjs";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

export default function PDFClient() {
  const [pdfWidth, setPdfWidth] = useState(200);
  const [pdfList, setPdfList] = useState<PdfFileItem[]>([]);
  const [pdfFile, setPdfFile] = useState<File>();
  // const [pdfFile, setPdfFile] = useState("/lhh.pdf");
  const pdfRef = useRef<DocumentCallback | null>(null);
  const [isDownload, setIsDownload] = useState(false);

  function onDocumentLoadSuccess(pdf: DocumentCallback) {
    pdfRef.current = pdf;
    setPdfList(
      Array.from({ length: pdf._pdfInfo.numPages }).map((_, i) => ({
        id: randomStr(i + 1),
        rotate: 0,
      }))
    );
  }

  async function downloadPdf() {
    /**
     * react-pdf 找不到什么能保存下旋转 pdf 图像的方法
     * 所以退而求其次，用 jsPdf 来简单实现了
     */
    // const data = await pdfRef.current?.saveDocument();
    // download(data, pdfFile.name || "rotate-pdf.pdf", "application/pdf");

    setIsDownload(true);

    await sleep(1000);

    const notDisplayContainer = document.querySelector(
      "#not-display-pdf-container"
    );
    const canvasArr = notDisplayContainer?.querySelectorAll("canvas");
    if (!canvasArr?.length) return;
    const doc = new jsPDF(
      canvasArr[0].width < canvasArr[0].height ? "p" : "l",
      "mm",
      "a4"
    );

    canvasArr?.forEach((canvas, i) => {
      if (i > 0) {
        doc.addPage(undefined, canvas.width < canvas.height ? "p" : "l");
      }
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, width, height);
    });

    doc.save(pdfFile?.name || "rotate-pdf.pdf");

    setIsDownload(false);
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
            setPdfFile(e.target.files?.[0]);
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-x-4 mb-8">
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
          onClick={() => setPdfFile(undefined)}
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
          <PDFPage
            pdfList={pdfList}
            setPdfList={setPdfList}
            pdfWidth={pdfWidth}
          />
        </Document>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={downloadPdf}>Download</Button>
      </div>
      {isDownload && (
        <NotDisplayPDF
          pdfFile={pdfFile}
          pdfList={pdfList}
        />
      )}
    </>
  );
}
