import GoogleButton from "../components/GoogleButton";

export default function Login() {
    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-[var(--foreground)] pt-8 pb-2 px-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-[var(--background)]">Log In</h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md border border-gray-300 p-3 placeholder-[var(--background)] text-[var(--background)] focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
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