/*
  Warnings:

  - Added the required column `n03_do_PUM` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "n03_do_PUM" DOUBLE PRECISION NOT NULL;
