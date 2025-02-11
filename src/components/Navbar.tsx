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

      <div className="px-5">User</div>
    </>
  );
}
