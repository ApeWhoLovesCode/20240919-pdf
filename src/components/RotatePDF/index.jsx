import PDFClient from "./PDFClient";

export default function RotatePDF() {
  return (
    <>
      <div className="flex flex-col text-center !mb-10 space-y-5">
        <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
          Simply click on a page to rotate it. You can then download your
          modified PDF.
        </p>
      </div>
      <PDFClient />
    </>
  );
}
