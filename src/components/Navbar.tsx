import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Link href="/search">
        <div className="px-5">
          <Image src={logo} alt="sdf" width={100} height={100} />
        </div>
      </Link>
      <div>Wyszukiwarka</div>
      <div>Porównywarka</div>
      <div>Generator wyceny</div>
      <div>Dodaj projekt</div>

      <div className="px-5">User</div>
    </>
  );
}
