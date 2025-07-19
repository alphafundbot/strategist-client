
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 relative">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-medium">404</h1>
        <div className="h-8 w-px bg-gray-600"></div>
        <p className="text-sm text-gray-400">This page could not be found.</p>
      </div>
      
      <Link href="/" className="absolute bottom-8 left-8 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-800 hover:text-white">
        N
      </Link>
    </div>
  );
}
