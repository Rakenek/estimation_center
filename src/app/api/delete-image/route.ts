import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function DELETE(req: NextRequest) {
  try {
    const { publicId } = await req.json(); // Expecting public_id from the client

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return NextResponse.json(
        { message: "Image deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
