import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-[#2A3743] text-white rounded-md font-medium hover:bg-black transition"
      >
        Return to Store
      </Link>
    </div>
  );
}

