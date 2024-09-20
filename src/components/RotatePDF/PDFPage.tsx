"use client";

import { RefreshCcw } from "lucide-react";
import { Page, useDocumentContext } from "react-pdf";
import { Button } from "../ui/button";
import { download } from "@/utils/file";
import { PdfFileItem } from "./type";

export default function PDFPage({
  pdfList,
  setPdfList,
  pdfWidth,
}: {
  pdfList: PdfFileItem[];
  setPdfList: (pdfList: PdfFileItem[]) => void;
  pdfWidth: number;
}) {
  // const context = useDocumentContext();

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
              // 编辑保存: https://github.com/wojtekmaj/react-pdf/issues/1776
              // renderForms={true}
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
        {/* <Button
          className="absolute bottom-0 left-1/4 -translate-x-1/2"
          variant="secondary"
          onClick={async () => {
            const data = await context.pdf.saveDocument();
            download(data, "newPdf.pdf", "application/pdf");
          }}
        >
          download
        </Button> */}
      </div>
    </>
  );
}
