import React from 'react';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import NavigationButton from './NavigationButton';

import AuthButton from './AuthButton.server';
import { LineChart } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      <Link href="/search">
        <div className="px-5">
          <Image src={logo} alt="sdf" width={100} height={100} />
        </div>
      </Link>
      <NavigationButton
        href={`/search`}
        text={'Wyszukiwarka Projektów'}
        iconName="SearchCheck"
      />
      <NavigationButton
        href={`/comparison`}
        text={'Porównywarka'}
        iconName="Scale"
      />
      <NavigationButton
        href={`/market-price-changes`}
        text={'Cenowe Trendy Rynkowe'}
        iconName="LineChart"
      />
      <NavigationButton
        href={`/add-project`}
        text={'Dodaj projekt'}
        iconName="HousePlus"
      />

      <div className="px-5">
        <AuthButton />
      </div>
    </>
  );
}
