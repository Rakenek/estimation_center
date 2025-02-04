"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function ExploreButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/search");
      }}
      className="px-6 py-2 bg-primaryDark text-white font-semibold rounded-lg hover:bg-primary focus:outline-none animate-moveInFromLeft"
    >
      Get Stated
    </button>
  );
}
