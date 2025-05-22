'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center gap-y-6 max-w-xl">
        <h1 className="text-5xl font-bold">Welcome to WebJournal</h1>
        <p className="text-lg">
          Log your thoughts, journal your adventures, and tailor your entries to your true self!
        </p>
        <Link
          href="/signup"
          className="px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 
          bg-[var(--foreground)] text-[var(--background)] hover:bg-blue-500 hover:text-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
