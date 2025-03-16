import { createProject } from "@/actions/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

import ProjectDataForm from "@/components/ProjectDataForm";
import { generateFlattenedDefaultObject } from "@/lib/customFunctions";

import React, { Suspense } from "react";

const AddProjectPage = async () => {
  const costObject = await generateFlattenedDefaultObject([
    "Project",
    "Parameters",
    "Cost",
  ]);
  costObject.image_url =
    "https://res-console.cloudinary.com/duv2kieyz/thumbnails/v1/image/upload/v1740656853/bXktbmV4dGpzLXByb2plY3Qvc2cwNWNubTdsY3E5Y2N1Mmp5dmI=/preview";

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDataForm action={createProject} newInitialData={costObject} />;
    </Suspense>
  );
};

export default AddProjectPage;
