import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateOrganizationRequest from "@/components/client/form/createOrganizationrRequest";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GlobalRole from "@/models/globalRole";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
const page = async () => {
  const session = await auth();

  await dbConnect();
  const user = await User.findById(session?.user._id);
  const role = await GlobalRole.findById(user?.global_role_id);

  if (role?.name == "org_admin") {
    redirect("/overview");
  } else if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateOrganizationRequest />
        </CardContent>
        <CardFooter className="flex justify-center text-gray-500 text-sm">
          Must Provide admin email
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
