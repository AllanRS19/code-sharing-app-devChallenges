import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center animate-pulse">
                <p className="text-center text-3xl mb-4">Loading snippet...</p>
                <Loader2 className="animate-spin size-10" />
            </div>
        </div>
    )
}