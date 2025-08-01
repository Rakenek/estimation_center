import LinkButton from "@/components/LinkButton";
import SteelPriceChart from "@/components/SteelPriceChart";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

// A separate component or hook that fetches data and suspends
async function SteelPriceData() {
  const steelPrice = await prisma.steelPrice.findMany(); // This would need to be moved to a client-side fetch or a different pattern
  return <SteelPriceChart steelPrice={steelPrice} />;
}

export default function SteelPage() {
  return (
    <div className="flex flex-col items-center justify-center text-4xl p-10">
      <h1 className="p-10">Cena Stali zbrojeniowej</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SteelPriceData />
      </Suspense>
      <div className="pt-10">
        <LinkButton href={"/market-price-changes/steel/add-data"}>
          Dodaj dane
        </LinkButton>
      </div>
    </div>
  );
}
