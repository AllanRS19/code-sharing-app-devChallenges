import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getTruncatedLink(id: string) {
    const shortId = id.split('-')[0];
    return `.../${shortId}`;
}