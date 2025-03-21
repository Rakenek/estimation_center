import { addSteelPriceData } from "@/actions/actions";
import SteelDataForm from "@/components/SteelDataForm";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function AddDataPage() {
  const steelPrice = await prisma.steelPrice.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="pt-28">
      <SteelDataForm steelPrice={steelPrice} action={addSteelPriceData} />
    </div>
  );
}
