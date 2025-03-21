import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MarketPriceChangesPage() {
  return (
    <div className="flex justify-center pt-32">
      <div className="p-10">
        <Link href="/market-price-changes/steel">
          <div className="relative group">
            {/* Image */}
            <Image
              src="https://res.cloudinary.com/duv2kieyz/image/upload/v1742490108/my-nextjs-project/p1vedfwiq2adddagywor.jpg"
              width={500}
              height={500}
              alt="Rebar"
              className="transition-transform transform group-hover:scale-110 duration-300 ease-in-out rounded-lg"
            />
            {/* Title over the image */}
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded-md">
              Stal
            </h1>
          </div>
        </Link>
      </div>

      <div className="p-10">
        <Link href="/market-price-changes/materials">
          <div className="relative group">
            {/* Image */}
            <Image
              src="https://res.cloudinary.com/duv2kieyz/image/upload/v1742490621/my-nextjs-project/b9nihlxoin4jtdcu5toh.jpg"
              width={500}
              height={500}
              alt="Rebar"
              className="transition-transform transform group-hover:scale-110 duration-300 ease-in-out rounded-lg"
            />
            {/* Title over the image */}
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded-md">
              Materiały budowlane
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
