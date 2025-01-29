import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all users
export async function GET() {
  const investments = await prisma.investment.findMany();
  return NextResponse.json(investments);
}

// POST a new user
export async function POST(req: Request) {
  const { name, city, imageUrl } = await req.json();
  const investments = await prisma.investment.create({
    data: { name, city, imageUrl },
  });
  return NextResponse.json(investments, { status: 201 });
}
