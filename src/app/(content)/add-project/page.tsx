import { createProject } from '@/actions/actions';

import ProjectDataForm from '@/components/ProjectDataForm';

import React from 'react';

const AddProjectPage = () => {
  return <ProjectDataForm action={createProject} />;
};

export default AddProjectPage;
