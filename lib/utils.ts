import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function fetcher<T>(method: 'GET' | 'POST', data: T) {
    try {
        const request = await fetch(`${process.env.BASE_URL}/api/snippets`, {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!request.ok) throw new Error(request.statusText);

        const requestData = await request.json();

        return requestData;
    } catch (err) {
        console.error(err);
    }
}