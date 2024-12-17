import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddEmployee from "@/components/client/form/addEmployee";

const page = async () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AddEmployee />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
