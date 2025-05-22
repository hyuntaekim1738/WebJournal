'use client';

import { useState } from 'react';
import GoogleButton from '../components/GoogleButton';
import { signIn } from 'next-auth/react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            signIn("credentials", {
                redirect: true,
                email: formData.email,
                password: formData.password,
                callbackUrl: "/home", 
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-[var(--foreground)] pt-8 pb-2 px-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-[var(--background)]">Sign Up</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>
                <GoogleButton>Sign Up With Google</GoogleButton>
            </div>
        </div>
    );
}

  