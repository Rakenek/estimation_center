import LinkButton from "@/components/LinkButton";
import SteelPriceChart from "@/components/SteelPriceChart";
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";

export default async function SteelPage() {
  const steelPrice = await prisma.steelPrice.findMany();

  return (
    <div className="flex flex-col items-center justify-center text-4xl p-10">
      <h1 className="p-10">Cena Stali zbrojeniowej</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SteelPriceChart steelPrice={steelPrice} />
      </Suspense>
      <div className="pt-10">
        <LinkButton href={"/market-price-changes/steel/add-data"}>
          Dodaj dane
        </LinkButton>
      </div>
    </div>
  );
}
