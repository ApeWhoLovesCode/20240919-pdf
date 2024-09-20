import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const RotatePDF = dynamic(() => import("@/components/RotatePDF"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="bg-[#f7f5ee] mx-auto py-20 space-y-5 relative">
        <div className="flex flex-col text-center !mb-10 space-y-5">
          <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
          <p className="mt-2 text-gray-600 max-w-lg mx-auto">
            Simply click on a page to rotate it. You can then download your
            modified PDF.
          </p>
        </div>
        <RotatePDF />
      </main>
      <Footer />
    </div>
  );
}
