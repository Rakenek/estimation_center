/*
  Warnings:

  - Made the column `powierzchnia_garazu_w_nadziemiu` on table `Parameters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parameters" ALTER COLUMN "powierzchnia_garazu_w_nadziemiu" SET NOT NULL;
