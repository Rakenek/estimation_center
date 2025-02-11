import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a User
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: "securepassword", // Make sure to hash passwords in production
      role: "ADMIN", // Use your defined enum value here
    },
  });

  // Create a Project
  const project = await prisma.project.create({
    data: {
      name: "Project One",
      city: "Kraków",
      image_url:
        "https://plus.unsplash.com/premium_vector-1724310048248-d6b52e189969?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user_id: user.id, // Linking the project to the user
    },
  });

  // Create Parameters for the project
  const parameters = await prisma.parameters.create({
    data: {
      powierzchnia_dzialki: 5000.0,
      powierzchnia_nadziemia: 3000.0,
      powierzchnia_podziemia: 1500.0,
      powierzchnia_niezabudowana_dzialki: 2500.0,
      powierzchnia_dachow: 800.0,
      powierzchnia_elewacji: 1000.0,
      powierzchnia_netto: 5000.0,
      powierzchnia_netto_podziemia: 1000.0,
      powierzchnia_netto_nadziemia: 4000.0,
      pum_i_puu: 1.2,
      pum: 1000.0,
      puu: 1200.0,
      powierzchnie_wspolne_nadziemia: 500.0,
      powierzchnia_garazu_w_nadziemiu: 100.0,
      liczba_kondygnacji: 5,
      liczba_miejsc_parkingowych: 50,
      liczba_parkliftow: 2,
      ilosc_mieszkan: 200,
      srednia_powierzchnia_mieszkania: 50.0,
      udzial_powierzchni_wspolnych_nadziemia: 0.2,
      pow_podziemia_do_pum_i_puu: 0.8,
      project_id: project.id, // Linking the parameters to the project
    },
  });

  // Create Cost for the project
  const cost = await prisma.cost.create({
    data: {
      przygotowanie_gruntu: 2000.0,
      roboty_ziemne: 1500.0,
      konstrukcja_podziemia: 3000.0,
      konstrukcja_nadziemia: 5000.0,
      elewacje: 2000.0,
      dachy: 1000.0,
      wykonczenie_nadziemia: 2000.0,
      wykonczenie_podziemia: 1500.0,
      windy: 1000.0,
      instalacje_klimatyzacyjne: 1500.0,
      instalacje_wodno_kanalizacyjne: 500.0,
      instalacje_gazowe: 300.0,
      instalacje_elektryczne: 1000.0,
      instalacje_teletechniczne: 400.0,
      infrastruktura: 2000.0,
      dfa: 1500.0,
      sieci: 1000.0,
      koszty_budowy: 25000.0,
      bhp: 500.0,
      offset_poza_dzialka: 300.0,
      project_id: project.id, // Linking the cost to the project
    },
  });

  console.log("Seed data has been inserted successfully!");
}

// Run the main function to seed data
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
