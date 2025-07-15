import { NextResponse } from "next/server";
import { pinata } from "@/lib/pinata"
import { auth } from "@/auth"

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const url = await pinata.upload.public.createSignedURL({
            expires: 30, // The only required param
        })
        return NextResponse.json({ url }, { status: 200 }); // Returns the signed upload URL
    } catch (error) {
        console.log(error);
        return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
    }
}