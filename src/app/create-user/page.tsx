import { createUserAction } from '@/actions/actions';
import CreateUserForm from '@/components/CreateUserForm';
import React from 'react';

export default function CreateUserPage() {
  return <CreateUserForm action={createUserAction} />;
}
