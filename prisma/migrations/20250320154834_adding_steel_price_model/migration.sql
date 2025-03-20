-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "n03_do_PUM" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "id" TEXT NOT NULL,
    "powierzchnia_dzialki" DOUBLE PRECISION NOT NULL,
    "powierzchnia_zabudowy_nadziemia" DOUBLE PRECISION NOT NULL,
    "powierzchnia_zabudowy_podziemia" DOUBLE PRECISION NOT NULL,
    "powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia" DOUBLE PRECISION NOT NULL,
    "powierzchnia_niezabudowana_dzialki" DOUBLE PRECISION NOT NULL,
    "powierzchnia_dachow" DOUBLE PRECISION NOT NULL,
    "powierzchnia_elewacji" DOUBLE PRECISION NOT NULL,
    "powierzchnia_netto" DOUBLE PRECISION NOT NULL,
    "powierzchnia_netto_podziemia" DOUBLE PRECISION NOT NULL,
    "powierzchnia_netto_nadziemia" DOUBLE PRECISION NOT NULL,
    "pum_i_puu" DOUBLE PRECISION NOT NULL,
    "pum" DOUBLE PRECISION NOT NULL,
    "puu" DOUBLE PRECISION NOT NULL,
    "powierzchnie_wspolne_nadziemia" DOUBLE PRECISION NOT NULL,
    "powierzchnia_garazu_w_nadziemiu" DOUBLE PRECISION NOT NULL,
    "liczba_kondygnacji_podziemnych" DOUBLE PRECISION NOT NULL,
    "liczba_kondygnacji_nadziemnych" DOUBLE PRECISION NOT NULL,
    "liczba_miejsc_parkingowych_w_budynku" DOUBLE PRECISION NOT NULL,
    "liczba_parkliftow" DOUBLE PRECISION NOT NULL,
    "ilosc_mieszkan" DOUBLE PRECISION NOT NULL,
    "srednia_powierzchnia_mieszkania" DOUBLE PRECISION NOT NULL,
    "udzial_powierzchni_wspolnych_nadziemia" DOUBLE PRECISION NOT NULL,
    "pow_podziemia_do_pum_i_puu" DOUBLE PRECISION NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" TEXT NOT NULL,
    "n01" DOUBLE PRECISION NOT NULL,
    "n03" DOUBLE PRECISION NOT NULL,
    "roboty_ziemne" DOUBLE PRECISION NOT NULL,
    "zabezpieczenie_wykopow" DOUBLE PRECISION NOT NULL,
    "sciany_szczelinowe" DOUBLE PRECISION NOT NULL,
    "roboty_palowe" DOUBLE PRECISION NOT NULL,
    "prace_fundamentowe" DOUBLE PRECISION NOT NULL,
    "konstrukcja_podziemia" DOUBLE PRECISION NOT NULL,
    "konstrukcja_nadziemia" DOUBLE PRECISION NOT NULL,
    "elewacje" DOUBLE PRECISION NOT NULL,
    "dachy" DOUBLE PRECISION NOT NULL,
    "wykonczenie_podziemia" DOUBLE PRECISION NOT NULL,
    "wykonczenie_nadziemia" DOUBLE PRECISION NOT NULL,
    "windy" DOUBLE PRECISION NOT NULL,
    "parklifty" DOUBLE PRECISION NOT NULL,
    "instalacje_klimatyzacyjne" DOUBLE PRECISION NOT NULL,
    "instalacje_wodno_kanalizacyjne" DOUBLE PRECISION NOT NULL,
    "instalacje_gazowe" DOUBLE PRECISION NOT NULL,
    "instalacje_elektryczne" DOUBLE PRECISION NOT NULL,
    "instalacje_teletechniczne" DOUBLE PRECISION NOT NULL,
    "infrastruktura" DOUBLE PRECISION NOT NULL,
    "dfa" DOUBLE PRECISION NOT NULL,
    "zielen" DOUBLE PRECISION NOT NULL,
    "sieci" DOUBLE PRECISION NOT NULL,
    "koszty_budowy" DOUBLE PRECISION NOT NULL,
    "bhp" DOUBLE PRECISION NOT NULL,
    "offset_poza_dzialka" DOUBLE PRECISION NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SteelPrice" (
    "id" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "min_PUDS" INTEGER NOT NULL,
    "max_PUDS" INTEGER NOT NULL,
    "avg_PUDS" INTEGER NOT NULL,
    "prefabricated" INTEGER NOT NULL,
    "complete" INTEGER NOT NULL,

    CONSTRAINT "SteelPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_project_id_key" ON "Parameters"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cost_project_id_key" ON "Cost"("project_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
