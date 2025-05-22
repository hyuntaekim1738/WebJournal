'use client';

import { signIn } from "next-auth/react";

export default function GoogleButton({ children }) {
    return (
        <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="my-6 w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-3 text-gray-700 hover:bg-gray-100 transition"
        >
            <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.4H272v95.3h146.9c-6.4 34.6-25.6 63.9-54.6 83.5v68.9h88.3c51.7-47.6 80.9-117.8 80.9-197.3z"
                    fill="#4285F4"
                />
                <path
                    d="M272 544.3c73.6 0 135.3-24.4 180.4-66.5l-88.3-68.9c-24.5 16.4-55.8 26-92.1 26-70.8 0-130.9-47.9-152.4-112.3H29.5v70.5c45.3 89.2 137.7 150.7 242.5 150.7z"
                    fill="#34A853"
                />
                <path
                    d="M119.6 322.6c-10.6-31.9-10.6-66.3 0-98.2V153.9H29.5c-38.5 76.9-38.5 167.6 0 244.5l90.1-75.8z"
                    fill="#FBBC04"
                />
                <path
                    d="M272 107.6c39.9-.6 78.2 14.3 107.5 40.5l80.2-80.2C403.4 24.6 338.7-.1 272 0 167.2 0 74.8 61.5 29.5 150.7l90.1 70.7C141.1 155.5 201.2 107.6 272 107.6z"
                    fill="#EA4335"
                />
            </svg>
            {children}
        </button>
    );
}