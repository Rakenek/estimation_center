import { createProject } from "@/actions/actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProjectDataForm from "@/components/ProjectDataForm";

import React, { Suspense } from "react";

const AddProjectPage = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDataForm action={createProject} />;
    </Suspense>
  );
};

export default AddProjectPage;
