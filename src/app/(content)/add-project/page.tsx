"use client";

import { createProject } from "@/actions/actions";
import FormInput from "@/components/FormInput";
import ProjectDataForm from "@/components/ProjectDataForm";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useActionState } from "react";
import * as XLSX from "xlsx";

const AddProjectPage = () => {
  const [state, formAction] = useActionState(createProject, {
    errors: { form: "" },
    success: "",
  });

  return <ProjectDataForm state={state} formAction={formAction} />;
};

export default AddProjectPage;
