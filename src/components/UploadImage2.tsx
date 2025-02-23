"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary"; // Import the type if available

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="p-4">
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!}
        onSuccess={(results: CloudinaryUploadWidgetResults) => {
          // Type guard to narrow down to the object with secure_url
          if (
            results &&
            "info" in results &&
            typeof results.info === "object" &&
            "secure_url" in results.info
          ) {
            setImageUrl(results.info.secure_url);
          }
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Image
      </CldUploadButton>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded image"
          className="mt-4 max-w-full h-auto rounded"
        />
      )}
    </div>
  );
}
