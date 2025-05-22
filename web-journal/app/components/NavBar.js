'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();
  const userFirstName = session?.user?.name?.split(' ')[0];

  return (
    <nav className="fixed top-0 left-0 w-full py-6 z-50 border-b-2 border-b-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 whitespace-nowrap">
        <div className="flex justify-between items-center lg:space-x-8">
          {session ? (<Link href="/home" className="sm:text-xl lg:text-2xl font-bold hover:text-blue-500 transition duration-150">
            {userFirstName ? `${userFirstName}'s WebJournal` : 'My WebJournal'}
            </Link>): 
            (<Link href="/" className="sm:text-xl lg:text-2xl font-bold hover:text-blue-500 transition duration-150">
              WebJournal
            </Link>)
          }
          <div className="flex space-x-4 sm:space-x-2 lg:space-x-8">
            {session ? (
              <>
                <Link
                  href="/home"
                  className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-150"
                >
                  Journal
                </Link>
                <Link
                  href="/profile"
                  className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-150"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-150"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-150"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="sm:text-xs lg:text-lg hover:text-blue-500 transition duration-150"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}