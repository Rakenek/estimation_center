"use server";

// import { prisma } from "@/lib/prisma";
// import { City } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// export async function createUser(formData: FormData) {
//   const name = formData.get("name") as string;
//   const city = formData.get("city") as City;
//   const imageUrl = formData.get("imageUrl") as string;

//   if (!name || !city || !imageUrl) {
//     throw new Error("Name and email are required");
//   }

//   try {
//     await prisma.project.create({
//       data: { name, city, imageUrl },
//     });

//     revalidatePath("/search"); // Refresh the user list after adding a new user
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to create user");
//   }
// }
