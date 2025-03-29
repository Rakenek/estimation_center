import React, { Suspense } from "react";
import MaterialsPriceChart from "../../../../components/MaterialsPriceChart";
import LinkButton from "@/components/LinkButton";
import { prisma } from "@/lib/prisma";

export default async function MaterialsPage() {
  const materialPriceData = await prisma.materialPrice.findMany();

  return (
    <div className="flex flex-col items-center justify-center text-4xl p-10">
      <h1 className="p-10">Zmiany Cen Materiałów Budowlanych</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MaterialsPriceChart materialPriceData={materialPriceData} />
      </Suspense>
      <div className="pt-10">
        <LinkButton href={"/market-price-changes/materials/add-data"}>
          Dodaj dane
        </LinkButton>
      </div>
    </div>
  );
}
