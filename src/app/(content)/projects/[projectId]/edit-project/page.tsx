"use client";
import { createProject } from "@/actions/actions";
import ProjectDataForm from "@/components/ProjectDataForm";
import React from "react";
import { useActionState } from "react";

export default function EditProjectPage() {
  const [state, formAction] = useActionState(createProject, {
    errors: { form: "" },
    success: "",
  });
  return <ProjectDataForm state={state} formAction={formAction} />;
}
