/*
  Warnings:

  - You are about to drop the column `instalacjeElektryczne` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `instalacjeGazowe` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `instalacjeKlimatyzacyjne` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `instalacjeTeletechniczne` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `instalacjeWodnoKanalizacyjne` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `konstrukcjaNadziemia` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `konstrukcjaPodziemia` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `kosztyBudowy` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `offsetPozaDzialka` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `przygotowanieGruntu` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `robotyZiemne` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `wykonczenieNadziemia` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `wykonczeniePodziamia` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `iloscMieszkan` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `liczbaMiejscParkingowych` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `liczbaParkliftow` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powDachow` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powDzialki` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powElewacji` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powNadziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powNetto` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powNettoNadziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powNettoPodziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powNiezabudowanaDzialki` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powPodziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powPodziemiaDoPUMPUU` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `powWspolneNadziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `pumpuu` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `sredniaPowMieszkania` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `udzialPowWspolnejNadziemia` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `costId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_id]` on the table `Cost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id]` on the table `Parameters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instalacje_elektryczne` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalacje_gazowe` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalacje_klimatyzacyjne` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalacje_teletechniczne` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalacje_wodno_kanalizacyjne` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `konstrukcja_nadziemia` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `konstrukcja_podziemia` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koszty_budowy` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offset_poza_dzialka` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `przygotowanie_gruntu` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roboty_ziemne` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wykonczenie_nadziemia` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wykonczenie_podziemia` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_mieszkan` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liczba_kondygnacji` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liczba_miejsc_parkingowych` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liczba_parkliftow` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pow_podziemia_do_pum_i_puu` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_dachow` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_dzialki` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_elewacji` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_nadziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_netto` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_netto_nadziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_netto_podziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_niezabudowana_dzialki` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnia_podziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powierzchnie_wspolne_nadziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pum_i_puu` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `srednia_powierzchnia_mieszkania` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udzial_powierzchni_wspolnych_nadziemia` to the `Parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cost" DROP CONSTRAINT "Cost_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Parameters" DROP CONSTRAINT "Parameters_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropIndex
DROP INDEX "Cost_projectId_key";

-- DropIndex
DROP INDEX "Parameters_projectId_key";

-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "instalacjeElektryczne",
DROP COLUMN "instalacjeGazowe",
DROP COLUMN "instalacjeKlimatyzacyjne",
DROP COLUMN "instalacjeTeletechniczne",
DROP COLUMN "instalacjeWodnoKanalizacyjne",
DROP COLUMN "konstrukcjaNadziemia",
DROP COLUMN "konstrukcjaPodziemia",
DROP COLUMN "kosztyBudowy",
DROP COLUMN "offsetPozaDzialka",
DROP COLUMN "projectId",
DROP COLUMN "przygotowanieGruntu",
DROP COLUMN "robotyZiemne",
DROP COLUMN "wykonczenieNadziemia",
DROP COLUMN "wykonczeniePodziamia",
ADD COLUMN     "instalacje_elektryczne" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "instalacje_gazowe" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "instalacje_klimatyzacyjne" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "instalacje_teletechniczne" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "instalacje_wodno_kanalizacyjne" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "konstrukcja_nadziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "konstrukcja_podziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "koszty_budowy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "offset_poza_dzialka" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "przygotowanie_gruntu" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roboty_ziemne" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wykonczenie_nadziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wykonczenie_podziemia" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Parameters" DROP COLUMN "iloscMieszkan",
DROP COLUMN "liczbaMiejscParkingowych",
DROP COLUMN "liczbaParkliftow",
DROP COLUMN "powDachow",
DROP COLUMN "powDzialki",
DROP COLUMN "powElewacji",
DROP COLUMN "powNadziemia",
DROP COLUMN "powNetto",
DROP COLUMN "powNettoNadziemia",
DROP COLUMN "powNettoPodziemia",
DROP COLUMN "powNiezabudowanaDzialki",
DROP COLUMN "powPodziemia",
DROP COLUMN "powPodziemiaDoPUMPUU",
DROP COLUMN "powWspolneNadziemia",
DROP COLUMN "projectId",
DROP COLUMN "pumpuu",
DROP COLUMN "sredniaPowMieszkania",
DROP COLUMN "udzialPowWspolnejNadziemia",
ADD COLUMN     "ilosc_mieszkan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "liczba_kondygnacji" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "liczba_miejsc_parkingowych" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "liczba_parkliftow" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pow_podziemia_do_pum_i_puu" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_dachow" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_dzialki" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_elewacji" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_nadziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_netto" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_netto_nadziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_netto_podziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_niezabudowana_dzialki" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnia_podziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "powierzchnie_wspolne_nadziemia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "pum_i_puu" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "srednia_powierzchnia_mieszkania" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "udzial_powierzchni_wspolnych_nadziemia" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "costId",
DROP COLUMN "imageUrl",
DROP COLUMN "userId",
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropEnum
DROP TYPE "City";

-- CreateIndex
CREATE UNIQUE INDEX "Cost_project_id_key" ON "Cost"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_project_id_key" ON "Parameters"("project_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
