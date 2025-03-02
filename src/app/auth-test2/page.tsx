import { auth } from "@/auth";
import React from "react";
import WhoAmIServerAction from "./WhoAmIServerAction";
import { onGetUserAction } from "@/actions/actions";
import WhoAmIAPI from "./WhoAmIAPI";
import WhoAmIRSC from "./WhoAmIRSC";

export default async function AuthTestPage2() {
  const session = await auth();
  return (
    <main>
      <h1 className="text-3xl mb-5">Test Route</h1>
      <div>User:{session?.user?.name}</div>
      <WhoAmIServerAction onGetUserAction={onGetUserAction} />
      <WhoAmIAPI />
      <WhoAmIRSC />
    </main>
  );
}
