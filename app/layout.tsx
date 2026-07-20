import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sileo";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: "NoteCode",
    description: "Best code sharing app",
    icons: {
        icon: '/logo.svg'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${outfit.className} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {children}
                <Toaster 
                    position="top-center"
                    theme="light"
                    options={{
                        fill: "#171717"
                    }}
                />
                <Analytics />
            </body>
        </html>
    );
}