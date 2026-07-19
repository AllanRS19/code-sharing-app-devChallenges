import clientPromise from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        await client.db("admin").command({ ping: 1 });
        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("MongoDB health check failed:", error);
        return NextResponse.json({ status: "error" }, { status: 500 });
    }
}