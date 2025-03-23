import { addMaterialPriceData } from "@/actions/actions";
import MaterialDataForm from "@/components/MaterialDataForm";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function AddMaterialPriceDataPage() {
  const materialPrice = await prisma.materialPrice.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div>
      <MaterialDataForm
        materialPrice={materialPrice}
        action={addMaterialPriceData}
      />
    </div>
  );
}
