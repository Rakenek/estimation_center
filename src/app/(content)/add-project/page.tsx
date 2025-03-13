import { createProject } from '@/actions/actions';
import LoadingSpinner from '@/components/LoadingSpinner';

import ProjectDataForm from '@/components/ProjectDataForm';
import { generateFlattenedDefaultObject } from '@/lib/customFunctions';

import React, { Suspense } from 'react';

const AddProjectPage = async () => {
  const costObject = await generateFlattenedDefaultObject([
    'Project',
    'Parameters',
    'Cost',
  ]);
  console.log(costObject);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDataForm action={createProject} newInitialData={costObject} />;
    </Suspense>
  );
};

export default AddProjectPage;
