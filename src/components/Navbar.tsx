import React from 'react';
import logo from '@/../public/logo.png';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <div className="px-5">
        <Image src={logo} alt="sdf" width={100} height={100} />
      </div>
      <div className="px-5">Kamil</div>
    </>
  );
}
