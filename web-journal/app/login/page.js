'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/home');
                router.refresh();
            }
        } catch (error) {
            setError('An error occurred during sign in');
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-[var(--foreground)] pt-8 pb-2 px-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-[var(--background)]">Log In</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>
                </form>
                <GoogleButton>Log In With Google</GoogleButton>
            </div>
        </div>
    );
}