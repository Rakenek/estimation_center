/*
  Warnings:

  - You are about to drop the column `offset` on the `Cost` table. All the data in the column will be lost.
  - Added the required column `offsetPozaDzialka` to the `Cost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "offset",
ADD COLUMN     "offsetPozaDzialka" DOUBLE PRECISION NOT NULL;
