// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Seeding database...");

//   // Create users
//   const users = await Promise.all([
//     prisma.user.create({
//       data: {
//         email: "admin@example.com",
//         name: "Admin User",
//         role: "ADMIN",
//         password: "securepassword",
//       },
//     }),
//     prisma.user.create({
//       data: {
//         email: "user@example.com",
//         name: "Regular User",
//         role: "USER",
//         password: "securepassword",
//       },
//     }),
//     prisma.user.create({
//       data: {
//         email: "guest@example.com",
//         name: "Guest User",
//         role: "GUEST",
//         password: "securepassword",
//       },
//     }),
//   ]);

//   // Create projects
//   const projects = await Promise.all([
//     prisma.project.create({
//       data: {
//         name: "Project Alpha",
//         city: "New York",
//         image_url:
//           "https://plus.unsplash.com/premium_vector-1724310048248-d6b52e189969?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         status: "Active",
//         n03_do_PUM: 6000,
//         user_id: users[0].id,
//       },
//     }),
//     prisma.project.create({
//       data: {
//         name: "Project Beta",
//         city: "Los Angeles",
//         image_url:
//           "https://plus.unsplash.com/premium_vector-1724310048248-d6b52e189969?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         status: "Planning",
//         n03_do_PUM: 6100,
//         user_id: users[1].id,
//       },
//     }),
//     prisma.project.create({
//       data: {
//         name: "Project Gamma",
//         city: "Chicago",
//         image_url:
//           "https://plus.unsplash.com/premium_vector-1724310048248-d6b52e189969?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         status: "Completed",
//         n03_do_PUM: 6200,
//         user_id: users[2].id,
//       },
//     }),
//   ]);

//   // Create parameters
//   await Promise.all(
//     projects.map((project) =>
//       prisma.parameters.create({
//         data: {
//           powierzchnia_dzialki: 1000,
//           powierzchnia_nadziemia: 500,
//           powierzchnia_podziemia: 200,
//           powierzchnia_niezabudowana_dzialki: 300,
//           powierzchnia_dachow: 150,
//           powierzchnia_elewacji: 250,
//           powierzchnia_netto: 600,
//           powierzchnia_netto_podziemia: 100,
//           powierzchnia_netto_nadziemia: 500,
//           pum_i_puu: 400,
//           pum: 300,
//           puu: 100,
//           powierzchnie_wspolne_nadziemia: 80,
//           powierzchnia_garazu_w_nadziemiu: 50,
//           liczba_kondygnacji: 10,
//           liczba_miejsc_parkingowych: 20,
//           liczba_parkliftow: 5,
//           ilosc_mieszkan: 30,
//           srednia_powierzchnia_mieszkania: 50,
//           udzial_powierzchni_wspolnych_nadziemia: 10,
//           pow_podziemia_do_pum_i_puu: 5,
//           project_id: project.id,
//         },
//       })
//     )
//   );

//   // Create costs
//   await Promise.all(
//     projects.map((project) =>
//       prisma.cost.create({
//         data: {
//           n01: 10000,
//           n03: 5000,
//           roboty_ziemne: 20000,
//           konstrukcja_podziemia: 30000,
//           konstrukcja_nadziemia: 40000,
//           elewacje: 15000,
//           dachy: 10000,
//           wykonczenie_nadziemia: 25000,
//           wykonczenie_podziemia: 20000,
//           windy: 5000,
//           instalacje_klimatyzacyjne: 10000,
//           instalacje_wodno_kanalizacyjne: 8000,
//           instalacje_gazowe: 6000,
//           instalacje_elektryczne: 12000,
//           instalacje_teletechniczne: 7000,
//           infrastruktura: 15000,
//           dfa: 5000,
//           sieci: 6000,
//           koszty_budowy: 200000,
//           bhp: 5000,
//           offset_poza_dzialka: 7000,
//           project_id: project.id,
//         },
//       })
//     )
//   );

//   console.log("Seeding completed!");
// }

// main()
//   .catch((e) => {
//     console.error("Error seeding the database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
