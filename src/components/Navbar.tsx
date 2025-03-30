import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "./NavigationButton";
import AuthButton from "./AuthButton.server";

export default async function Navbar() {
  return (
    <>
      <Link href="/search">
        <div className="px-5">
          <Image src={logo} alt="logo" width={60} height={60} />
        </div>
      </Link>
      <div className="flex items-stretch">
        <NavigationButton
          href={`/search`}
          text={"Wyszukiwarka Projektów"}
          iconName="SearchCheck"
        />
        <NavigationButton
          href={`/comparison`}
          text={"Porównywarka 1 vs 1"}
          iconName="Scale"
        />
        <NavigationButton
          href={`/all-projects-summary`}
          text={"Zestawienie projektów"}
          iconName="ChartColumn"
        />
        <NavigationButton
          href={`/market-price-changes`}
          text={"Cenowe Trendy Rynkowe"}
          iconName="LineChart"
        />
        <NavigationButton
          href={`/add-project`}
          text={"Dodaj projekt"}
          iconName="HousePlus"
        />
      </div>
      <div className="px-5">
        <AuthButton />
      </div>
    </>
  );
}
