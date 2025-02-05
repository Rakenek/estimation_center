/*
  Warnings:

  - You are about to drop the column `powierzchniaPodziemiaDoPUMPUU` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `udziałPowierzchniWspólnejNadziemia` on the `Parameters` table. All the data in the column will be lost.
  - Added the required column `powPodziemiaDoPUMPUU` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udzialPowWspolnejNadziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parameters" DROP COLUMN "powierzchniaPodziemiaDoPUMPUU",
DROP COLUMN "udziałPowierzchniWspólnejNadziemia",
ADD COLUMN     "powPodziemiaDoPUMPUU" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "udzialPowWspolnejNadziemia" DOUBLE PRECISION NOT NULL;
