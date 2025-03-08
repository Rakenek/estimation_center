"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ExploreButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <button
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        router.push("/search");
      }}
      className={`px-6 py-2 bg-primaryDark text-white font-semibold rounded-lg hover:bg-primary focus:outline-none animate-moveInFromLeft ${
        isLoading ? "bg-slate-500" : ""
      } `}
    >
      {isLoading ? "Entering..." : "Get Stated"}
    </button>
  );
}
