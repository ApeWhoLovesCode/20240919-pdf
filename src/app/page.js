import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RotatePDF from "@/components/RotatePDF";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="bg-[#f7f5ee] mx-auto py-20 space-y-5">
        <RotatePDF />
      </main>
      <Footer />
    </div>
  );
}
