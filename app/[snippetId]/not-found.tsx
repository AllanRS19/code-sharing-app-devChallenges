import Link from "next/link";

export default function NotFound() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-8 text-center">
                <h1 className="text-7xl font-semibold">404</h1>
                <p className="text-xl text-gray-brand-600 font-medium">The snippet you were looking for does not exist</p>
                <Link href="/" className="text-lg bg-brand px-8 py-4 rounded-full text-white transition-all hover:bg-brand/80">
                    Go back to home
                </Link>
            </div>
        </div>
    )
}