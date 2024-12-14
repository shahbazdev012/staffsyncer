import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateOrganization from "@/components/client/form/createOrganization";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateOrganization />
        </CardContent>
        <CardFooter className="flex justify-center text-gray-500 text-sm">
          Must Provide admin email
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
