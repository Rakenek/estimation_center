/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - Added the required column `costId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('Krakow', 'Warsaw', 'Wroclaw', 'Gdansk', 'Poznan', 'Katowice', 'Lodz');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageUrl",
ADD COLUMN     "costId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "id" TEXT NOT NULL,
    "powDzialki" DOUBLE PRECISION NOT NULL,
    "powNadziemia" DOUBLE PRECISION NOT NULL,
    "powPodziemia" DOUBLE PRECISION NOT NULL,
    "powNiezabudowanaDzialki" DOUBLE PRECISION NOT NULL,
    "powElewacji" DOUBLE PRECISION NOT NULL,
    "powDachow" DOUBLE PRECISION NOT NULL,
    "powNetto" DOUBLE PRECISION NOT NULL,
    "powNettoPodziemia" DOUBLE PRECISION NOT NULL,
    "powNettoNadziemia" DOUBLE PRECISION NOT NULL,
    "pum" DOUBLE PRECISION NOT NULL,
    "puu" DOUBLE PRECISION NOT NULL,
    "pumpuu" DOUBLE PRECISION NOT NULL,
    "powWspolneNadziemia" DOUBLE PRECISION NOT NULL,
    "liczbaMiejscParkingowych" DOUBLE PRECISION NOT NULL,
    "liczbaParkliftow" DOUBLE PRECISION NOT NULL,
    "iloscMieszkan" DOUBLE PRECISION NOT NULL,
    "sredniaPowMieszkania" DOUBLE PRECISION NOT NULL,
    "udziałPowierzchniWspólnejNadziemia" DOUBLE PRECISION NOT NULL,
    "powierzchniaPodziemiaDoPUMPUU" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" TEXT NOT NULL,
    "przygotowanieGruntu" DOUBLE PRECISION NOT NULL,
    "robotyZiemne" DOUBLE PRECISION NOT NULL,
    "konstrukcjaPodziemia" DOUBLE PRECISION NOT NULL,
    "konstrukcjaNadziemia" DOUBLE PRECISION NOT NULL,
    "elewacje" DOUBLE PRECISION NOT NULL,
    "dachy" DOUBLE PRECISION NOT NULL,
    "wykonczenieNadziemia" DOUBLE PRECISION NOT NULL,
    "wykonczeniePodziamia" DOUBLE PRECISION NOT NULL,
    "windy" DOUBLE PRECISION NOT NULL,
    "instalacjeKlimatyzacyjne" DOUBLE PRECISION NOT NULL,
    "instalacjeWodnoKanalizacyjne" DOUBLE PRECISION NOT NULL,
    "instalacjeGazowe" DOUBLE PRECISION NOT NULL,
    "instalacjeElektryczne" DOUBLE PRECISION NOT NULL,
    "instalacjeTeletechniczne" DOUBLE PRECISION NOT NULL,
    "infrastruktura" DOUBLE PRECISION NOT NULL,
    "dfa" DOUBLE PRECISION NOT NULL,
    "sieci" DOUBLE PRECISION NOT NULL,
    "kosztyBudowy" DOUBLE PRECISION NOT NULL,
    "bhp" DOUBLE PRECISION NOT NULL,
    "offset" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_projectId_key" ON "Parameters"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Cost_projectId_key" ON "Cost"("projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
