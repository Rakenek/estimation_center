/*
  Warnings:

  - You are about to drop the column `liczba_kondygnacji` on the `Parameters` table. All the data in the column will be lost.
  - Added the required column `liczba_kondygnacji_nadziemnych` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liczba_kondygnacji_podziemnych` to the `Parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parameters" DROP COLUMN "liczba_kondygnacji",
ADD COLUMN     "liczba_kondygnacji_nadziemnych" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "liczba_kondygnacji_podziemnych" DOUBLE PRECISION NOT NULL;
