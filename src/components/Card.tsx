import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  id: string;
  city: string;
  name: string;
  imageUrl: string;
  status: string;
  n03: number;
};

const Card: React.FC<CardProps> = ({
  id,
  city,
  name,
  imageUrl,
  status,
  n03,
}) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
        <Image
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={city}
          width={100}
          height={100}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="mt-2 text-gray-600">{city}</p>
          <p className="mt-2 text-gray-600">N03: {Math.round(n03)} PLN</p>
          <p
            className={`mt-2 text-gray-600 ${
              status === "Wycena" ? "text-green-600" : ""
            } ${status === "Kontraktacja" ? "text-purple-600" : ""}
            ${status === "Zakończono" ? "text-red-600" : ""}`}
          >
            Status: {status}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
