'use client';

import Image from 'next/image';
import { useState } from 'react';

interface UploadImageProps {
  handleDataFromChild: (data: string) => void;
}

export default function UploadImage({ handleDataFromChild }: UploadImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.url) {
      setImageUrl(data.url);
      handleDataFromChild(data.url);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={100}
          height={150}
          className="rounded"
        />
      )}
    </div>
  );
}
