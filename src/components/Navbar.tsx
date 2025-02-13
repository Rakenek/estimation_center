import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "./NavigationButton";

export default function Navbar() {
  return (
    <>
      <Link href="/search">
        <div className="px-5">
          <Image src={logo} alt="sdf" width={100} height={100} />
        </div>
      </Link>
      <NavigationButton href={`/search`} text={"Wyszukiwarka Projektów"} />
      <NavigationButton href={`/comparison`} text={"Porównywarka"} />
      <NavigationButton
        href={`/estimation-generator`}
        text={"Generator wyceny"}
      />
      <NavigationButton href={`/add-project`} text={"Dodaj projekt"} />

      <div className="px-5">User</div>
    </>
  );
}
