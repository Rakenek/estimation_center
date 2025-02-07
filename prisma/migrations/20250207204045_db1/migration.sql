/*
  Warnings:

  - The values [Krakow,Warsaw,Wroclaw,Gdansk,Poznan,Lodz] on the enum `City` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "City_new" AS ENUM ('Kraków', 'Warszawa', 'Wrocław', 'Gdańsk', 'Poznań', 'Katowice', 'Łódź');
ALTER TABLE "Project" ALTER COLUMN "city" TYPE "City_new" USING ("city"::text::"City_new");
ALTER TYPE "City" RENAME TO "City_old";
ALTER TYPE "City_new" RENAME TO "City";
DROP TYPE "City_old";
COMMIT;
