import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "./NavigationButton";
import { auth } from "@/auth";
import AuthButton from "./AuthButton.server";

export default async function Navbar() {
  const session = await auth();
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
        href={`/market-price-changes`}
        text={"Cenowe Trendy Rynkowe"}
      />
      <NavigationButton href={`/add-project`} text={"Dodaj projekt"} />

      <div className="px-5">
        <AuthButton />
      </div>
    </>
  );
}
