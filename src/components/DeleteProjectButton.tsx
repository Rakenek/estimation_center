"use client";
import { deleteProject } from "@/actions/actions";
import { redirect, useParams } from "next/navigation";

import React, { useActionState, useEffect } from "react";

export default function DeleteProjectButton() {
  const props = useParams<{ projectId: string }>();
  const { projectId } = props;

  const [state, formAction] = useActionState(deleteProject, {
    errors: { form: "" },
    success: "",
  });

  if (state.success?.length > 0) {
    redirect("/search");
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <button
        type="submit"
        className="flex w-full items-center gap-3 p-3 transition-all duration-200 bg-red-700"
      >
        USUŃ
      </button>
      {state.errors.form && (
        <p className="text-red-500 text-sm">{state.errors.form}</p>
      )}
    </form>
  );
}
