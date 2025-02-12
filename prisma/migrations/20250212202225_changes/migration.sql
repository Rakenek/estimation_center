/*
  Warnings:

  - You are about to drop the column `przygotowanie_gruntu` on the `Cost` table. All the data in the column will be lost.
  - Added the required column `n01` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n03` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "przygotowanie_gruntu",
ADD COLUMN     "n01" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "n03" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" TEXT NOT NULL;
