
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-6 z-50 border-b-2 border-b-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 whitespace-nowrap">

        <div className="flex justify-between items-center lg:space-x-8">
          <Link href="/" className="sm:text-xl lg:text-2xl font-bold hover:text-blue-500">
            Web Journal
          </Link>

          <div className="flex space-x-4 sm:space-x-2 lg:space-x-8">
            <Link
              href="/projects"
              className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-300"
            >
              Journal
            </Link>
            <Link
              href="/experience"
              className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-300"
            >
              Profile
            </Link>
            <Link
              href="/experience"
              className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-300"
            >
              Log In
            </Link>
            <Link
              href="/experience"
              className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}