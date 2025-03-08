"use client";
import { deleteProject } from "@/actions/actions";
import { redirect, useParams } from "next/navigation";

import React, { useActionState, useState } from "react";

export default function DeleteProjectButton() {
  const [loading, setIsLoading] = useState(false);
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
        className={`flex w-full items-center gap-3 px-5 py-2 rounded transition-all duration-200  ${
          loading ? "bg-red-900" : "bg-red-500"
        }`}
      >
        {loading ? "USUWAM" : "USUŃ"}
      </button>
      {state.errors.form && (
        <p className="text-red-500 text-sm">{state.errors.form}</p>
      )}
    </form>
  );
}
