import Link from "next/link";

const linkList = [
  { title: "Pricing", url: "/" },
  { title: "Chrome extension", url: "/" },
  { title: "Use cases", url: "/" },
  { title: "Get started", url: "/" },
];
export default function Header() {
  return (
    <div className="h-16">
      <div className="h-16 p-4 bg-white fixed z-10 left-0 right-0 top-0 flex justify-between items-center">
        <div className="text-xl font-bold">PDF.ai</div>
        <div className="space-x-4 font-medium">
          {linkList.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
