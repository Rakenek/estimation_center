import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

// POST a new user
export async function POST(req: Request) {
  const { name, city, imageUrl } = await req.json();
  const project = await prisma.project.create({
    data: { name, city, imageUrl },
  });
  return NextResponse.json(project, { status: 201 });
}
