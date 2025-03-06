import { createUserAction } from "@/actions/actions";
import { auth } from "@/auth";
import CreateUserForm from "@/components/CreateUserForm";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreateUserPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  if (user.role !== Role.ADMIN) {
    redirect("/search");
  }
  return <CreateUserForm action={createUserAction} />;
}
