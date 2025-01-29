import Image from 'next/image';
import React from 'react';

type CardProps = {
  city: string;
  name: string;
  imageUrl: string;
};

const Card: React.FC<CardProps> = ({ city, name, imageUrl }) => {
  return (
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
      </div>
    </div>
  );
};

export default Card;
