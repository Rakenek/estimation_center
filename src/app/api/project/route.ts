import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}
