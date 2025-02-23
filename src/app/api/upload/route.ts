import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary"; // Adjust the path to your cloudinary.ts

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const fileUri = `data:${mimeType};base64,${base64}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "my-nextjs-project", // Optional: organize uploads in a folder
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
