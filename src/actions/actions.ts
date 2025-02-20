"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProject(formData: FormData): Promise<void> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const image_url = formData.get("image_url") as string;
    const status = formData.get("status") as string;
    const n03_do_PUM = parseFloat(formData.get("n03_do_PUM") as string);

    // Ensure required fields are present
    if (!name || !city || isNaN(n03_do_PUM)) {
      throw new Error("Missing required fields");
    }

    // Create project entry in the database
    await prisma.project.create({
      data: {
        name,
        city,
        image_url,
        status,
        n03_do_PUM,
        user_id: "4f5a47fc-51c7-40f4-8492-5405c9a374a9", // Replace with dynamic user_id if needed
      },
    });

    console.log("Project created successfully");
  } catch (error) {
    console.error("Database error:", error);
    throw error; // Throwing the error instead of returning ensures it's handled correctly
  }
}
